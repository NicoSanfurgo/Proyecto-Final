const fs =  require('fs')

class FsManager{

    async getData(path){
        try{
            const dataFs = await fs.promises.readFile(path)
            const dataJSON = JSON.parse(dataFs)
            const { data = [] } = dataJSON
            return data
        }catch(err){
            return []
        }
    }

    async getCurrentId(path){
        try{
            const data =  await fs.promises.readFile(path)
            const { currentId } = JSON.parse(data)
            return currentId 

        }catch(err){
            return 0
        }
        
    }

    async saveInFile(path ,data,currentId = null){
        await fs.promises.writeFile(
            path,
            JSON.stringify(
                {data: data, 
                 currentId: currentId || await this.getCurrentId(path) },
                 null,'\t'))
    }
}

module.exports = new FsManager()