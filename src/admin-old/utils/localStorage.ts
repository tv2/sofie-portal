export const loadUserFile = (file: any): Promise<any> => {
  return new Promise((resolve) => {
    let fileReader = new FileReader()

    fileReader.readAsText(file)
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      resolve(event?.target?.result)
    }
  })
}
