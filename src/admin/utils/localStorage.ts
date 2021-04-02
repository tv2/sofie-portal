import { IUser } from '../../model/usersInterface'

export const loadUserFile = (file: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader()

        fileReader.readAsText(file)
        fileReader.onload = (event: ProgressEvent<FileReader>) => {
            resolve (event?.target?.result)
        }
    })
}
