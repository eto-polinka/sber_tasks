import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decodeFields(encoded, translations) {
    const decoded = []; 
    const uniqueIds = new Set();

    for (const obj of encoded) {
      const decodedObj = {};
  
      for (const key in obj) {
        if (key.endsWith("id")) {

          const translationKey = obj[key];
          const translation = translations[translationKey];
  
          if (translation) {
            decodedObj[key] = translation; 
            uniqueIds.add(translation); 
          } else {
            decodedObj[key] = obj[key]; 
          }
        } else if (key === "groupId" || key === "service" ||  key === "formatSize" ||  key === "ca") {

          decodedObj[key] = obj[key];
        } else {

          decodedObj[key] = obj[key];
        }
      }
  
      decoded.push(decodedObj); 
    }
  
    return {
      decoded,
      uniqueIds: Array.from(uniqueIds), 
    };
  }
  
  const encoded = [
    { groupId: 1, userId: "A123", service: "Service1", formatSize: 10, ca: "CA1" },
    { groupId: 2, userId: "B456", service: "Service2", formatSize: 20, ca: "CA2" },
  ];
  
  const translations = {
    A123: "UserA",
    B456: "UserB",
  };
  
  const result = decodeFields(encoded, translations);
  console.log(result.decoded);
  console.log(result.uniqueIds);