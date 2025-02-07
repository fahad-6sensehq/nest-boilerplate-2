export class UpdateMultipleDataHandler {
    static findDataToUpdate(existingData: any[], newData: any[]): unknown {
        // find the common data by comparing both existing and new data arrays existing charger are object ids and newData are string arrays
        const existingDataSet = new Set(
            existingData.map((item) => {
                return item.toString();
            })
        );

        const commonData = newData.filter((item) => {
            return existingDataSet.has(item);
        });
        const commonDataSet = new Set(
            commonData.map((item) => {
                return item.toString();
            })
        );

        // find to add ids by subtracting common data from newData
        const idsToAdd = newData.filter((item) => {
            return !existingDataSet.has(item);
        });

        // find to remove ids by subtracting commonData from existingData
        const idsToRemove = existingData
            .filter((item) => {
                return !commonDataSet.has(item.toString());
            })
            .map((item) => {
                return item.toString();
            });
        return {
            idsToAdd,
            idsToRemove,
            commonData,
        };
    }
}
