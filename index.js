
const { encrypt, decrypt } = require("./encryption-check")

const encryptData = JSON.parse(decrypt(
"U2FsdGVkX18TmhLQIoalrC3uKN2UYWUtanweJ0kCIo6yI3JkE8JQj9d4qFL2MyeqnoFdTZbdZj+wouce7sFCS87T9jN6ZvNBrvcd1oMi1OhB2yDKuFtkQkPQO5ExGkGUr38Uv/D5s+YpHaMkIcQpmOzdE8NTRwu5s9GbuuGsS7mJK+LlZUrDCBiqpkvRrNxGxEUM1bGk3BtY/97R3oM9iHSsQj9tsSgNxWRsa3zC7hMTQtrWRNjoYmFBebRXxqEsxjDBrJ/LgHkIc5Ju9fciGjg+inZ3AFIGtAtNnzgKej+LpkENcf0XBJpX/mS16/36DkYBlVthUJvjDz0sjgyJMWxH+MbIFH4BrhWI0elM+v71IWjF6lARM22k/79s5LbzrBqZsrxFJ0yNywfHnXLUzJFELlj+r6BCI4zvbl9nYOKiYKruRO8KTBXfvaYkn4v/mwgWEKdmCL9QQ6p92GPqX2dPMqDbRtM0fgjWwZcKLEbx3LOSE2OF9K7dUQr9ZANaX1nRPKRF0jgxsBoI2D1n2pmXB1kyr3cT38L2egj8xV+J1vH02ExZr8cug7liwDeZUSOO3UW5Jg0ZGs8OCca9iJ6wKIDE9yEI4YwrYuYVKZxyjD4R4vsI70pU2lwzB/mGJzVUvQZ2oD8bFrpo1vc3+g=="

))

console.log("encryptData: ", encryptData);

// -----------------------------------------------------------------------------------------------------
// If we need to Decrypt uncomment below code

const decryptdata = [
    {
      id: '967b6417-627a-4827-856a-0b40e68c66d4',
      name: '2023-2024',
      master_id: 'e664dd23-619c-4625-80d7-f818b458c697',
      created_at: '2025-04-09T07:55:48.929Z'
    },
    {
      id: 'f78007ff-fcb4-40f0-a938-67e7e3ca9adf',
      name: '2024-2025',
      master_id: 'e664dd23-619c-4625-80d7-f818b458c697',
      created_at: '2025-04-09T07:55:48.929Z'
    },
    {
      id: '29c6a34d-9ffe-431a-916d-92918ed4d688',
      name: '2025-2026',
      master_id: 'e664dd23-619c-4625-80d7-f818b458c697',
      created_at: '2025-04-09T07:55:48.929Z'
    }
  ];
  
  console.log(encrypt(JSON.stringify(decryptdata))); 
  console.log("decryptdata: ", decryptdata);
  
