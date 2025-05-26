// Initialize toastr
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: "3000",
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
    if (!result) {
      throw new Error("Decryption failed - possibly wrong decryption key");
    }
    return result;
  } catch (error) {
    console.error("Decryption error:", error);
    return "Error: " + error.message;
  }
}

// Copy to clipboard function
function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  const text = element.innerText || element.textContent;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      toastr.success("Copied to clipboard!");
    })
    .catch((err) => {
      toastr.error("Failed to copy: " + err);
      console.error("Failed to copy: ", err);
    });
}

// Format JSON for display
function formatJson(jsonString) {
  try {
    const obj = JSON.parse(jsonString);
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return jsonString; // Return as-is if not valid JSON
  }
}

// Event listeners
document.getElementById("encryptBtn").addEventListener("click", function () {
  const plainText = document.getElementById("plainText").value;
  const secretKey = document.getElementById("encryptionKey").value;

  if (!plainText) {
    toastr.warning("Please enter text to encrypt");
    return;
  }

  try {
    // Try to parse as JSON to validate (but encrypt the original string)
    JSON.parse(plainText);
    const encrypted = encrypt(plainText, secretKey);
    document.getElementById("encryptResult").textContent = encrypted;
    document.getElementById("encryptResultContainer").style.display = "block";
    toastr.success("Encryption successful!");
  } catch (e) {
    swal({
      title: "Not Valid JSON",
      text: "The input is not valid JSON. Do you want to encrypt it anyway?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willEncrypt) => {
      if (willEncrypt) {
        const encrypted = encrypt(plainText, secretKey);
        document.getElementById("encryptResult").textContent = encrypted;
        document.getElementById("encryptResultContainer").style.display =
          "block";
        toastr.success("Encryption successful!");
      }
    });
  }
});

document.getElementById("decryptBtn").addEventListener("click", function () {
  const encryptedText = document.getElementById("encryptedText").value;
  const secretKey = document.getElementById("decryptionKey").value;

  if (!encryptedText) {
    toastr.warning("Please enter text to decrypt");
    return;
  }

  const decrypted = decrypt(encryptedText, secretKey);
  document.getElementById("decryptResult").textContent = formatJson(decrypted);
  document.getElementById("decryptResultContainer").style.display = "block";

  if (decrypted.startsWith("Error:")) {
    toastr.error(decrypted);
  } else {
    toastr.success("Decryption successful!");
  }
});
