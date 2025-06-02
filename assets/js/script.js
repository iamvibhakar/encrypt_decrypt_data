// Initialize toastr
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: "3000"
};

// Encryption function
function encrypt(text, secretKey) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// Decryption function
function decrypt(encryptedText, secretKey) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const result = bytes.toString(CryptoJS.enc.Utf8);
    if (!result) throw new Error("Decryption failed - possibly wrong key");
    return result;
  } catch (error) {
    console.error("Decryption error:", error);
    return "Error: " + error.message;
  }
}

// Copy to clipboard
function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  const text = element.innerText;
  navigator.clipboard.writeText(text)
    .then(() => toastr.success("Copied to clipboard!"))
    .catch(err => toastr.error("Failed to copy: " + err));
}

// Format JSON with syntax highlighting
function formatJson(jsonString) {
  try {
    const obj = JSON.parse(jsonString);
    return syntaxHighlight(JSON.stringify(obj, null, 2));
  } catch (e) {
    return jsonString; // Return as-is if not JSON
  }
}

// Syntax highlighting
function syntaxHighlight(json) {
  if (typeof json != 'string') json = JSON.stringify(json, null, 2);
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, 
    function(match) {
      let cls = 'text-success';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) cls = 'text-danger';
      } else if (/true|false/.test(match)) {
        cls = 'text-info';
      } else if (/null/.test(match)) {
        cls = 'text-warning';
      } else if (!isNaN(match)) {
        cls = 'text-secondary';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
}

// Beautify JSON
function beautifyJson() {
  const resultElement = document.getElementById("decryptResult");
  try {
    // Get raw text (handles both textContent and innerHTML cases)
    let rawText = resultElement.textContent || resultElement.innerText;
    
    // Clean any existing HTML tags
    rawText = rawText.replace(/<[^>]*>?/gm, '');
    
    // Parse and format
    const jsonObj = JSON.parse(rawText);
    resultElement.innerHTML = syntaxHighlight(JSON.stringify(jsonObj, null, 2));
    toastr.success("JSON beautified!");
  } catch (e) {
    console.error("Beautify error:", e);
    toastr.error("Could not beautify - invalid JSON");
  }
}

// Event listeners
document.getElementById("encryptBtn").addEventListener("click", function() {
  const plainText = document.getElementById("plainText").value;
  const secretKey = document.getElementById("encryptionKey").value;

  if (!plainText) return toastr.warning("Please enter text to encrypt");
  if (!secretKey) return toastr.warning("Please enter encryption key");

  try {
    JSON.parse(plainText); // Validate JSON
    const encrypted = encrypt(plainText, secretKey);
    document.getElementById("encryptResult").textContent = encrypted;
    document.getElementById("encryptResultContainer").style.display = "block";
    toastr.success("Encryption successful!");
  } catch (e) {
    swal({
      title: "Not Valid JSON",
      text: "Encrypt anyway?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willEncrypt) => {
      if (willEncrypt) {
        const encrypted = encrypt(plainText, secretKey);
        document.getElementById("encryptResult").textContent = encrypted;
        document.getElementById("encryptResultContainer").style.display = "block";
        toastr.success("Encryption successful!");
      }
    });
  }
});

document.getElementById("decryptBtn").addEventListener("click", function() {
  const encryptedText = document.getElementById("encryptedText").value;
  const secretKey = document.getElementById("decryptionKey").value;

  if (!encryptedText) return toastr.warning("Please enter text to decrypt");
  if (!secretKey) return toastr.warning("Please enter decryption key");

  const decrypted = decrypt(encryptedText, secretKey);
  const resultElement = document.getElementById("decryptResult");
  
  if (decrypted.startsWith("Error:")) {
    resultElement.textContent = decrypted;
    document.getElementById("beautifyBtn").style.display = "none";
    toastr.error(decrypted);
  } else {
    resultElement.innerHTML = formatJson(decrypted);
    // Show beautify button only if valid JSON
    try {
      JSON.parse(decrypted);
      document.getElementById("beautifyBtn").style.display = "inline-block";
    } catch {
      document.getElementById("beautifyBtn").style.display = "none";
    }
    toastr.success("Decryption successful!");
  }
  
  document.getElementById("decryptResultContainer").style.display = "block";
});

// Beautify button event
document.getElementById("beautifyBtn").addEventListener("click", beautifyJson);