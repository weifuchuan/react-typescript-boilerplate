
export default function selectFiles(): Promise<File[]> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.style.display = "none";
    input.onchange = () => {
      if (input.files) {
        const files: File[] = [];
        for (let i = 0; i < input.files.length; i++) {
          files.push(input.files.item(i)!);
        }
        resolve(files);
      } else {
        reject();
      }
    };
    document
      .getElementsByTagName("html")!
      .item(0)!
      .appendChild(input);
    input.click();
  });
}