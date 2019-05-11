export default function readFile(
  file: Blob,
  to: "arraybuffer" | "string" | "base64" = "arraybuffer"
): Promise<string | ArrayBuffer | null> {
  return new Promise((resovle, reject) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      resovle(fileReader.result);
    };
    fileReader.onerror = reject;
    switch (to) {
      case "arraybuffer":
        fileReader.readAsArrayBuffer(file);
        break;
      case "base64":
        fileReader.readAsDataURL(file);
        break;
      case "string":
        fileReader.readAsText(file);
        break;
      default:
        fileReader.readAsArrayBuffer(file);
    }
  });
}
