export function atbashCipher(text) {
  return text
    .split('') // Split the input string into an array of characters
    .map(char => {
      // Check if the character is an uppercase letter (A-Z)
      if (char >= 'A' && char <= 'Z') {
        // Calculate the mirrored character using character codes
        // 'A'.charCodeAt(0) is 65, 'Z'.charCodeAt(0) is 90
        // The mapping is A + (Z - current_char_code)
        return String.fromCharCode('A'.charCodeAt(0) + ('Z'.charCodeAt(0) - char.charCodeAt(0)));
      }
      // Check if the character is a lowercase letter (a-z)
      else if (char >= 'a' && char <= 'z') {
        // Calculate the mirrored character using character codes
        // 'a'.charCodeAt(0) is 97, 'z'.charCodeAt(0) is 122
        // The mapping is a + (z - current_char_code)
        return String.fromCharCode('a'.charCodeAt(0) + ('z'.charCodeAt(0) - char.charCodeAt(0)));
      }
      // If the character is not a letter, return it unchanged
      else {
        return char;
      }
    })
    .join(''); // Join the array of characters back into a string
}