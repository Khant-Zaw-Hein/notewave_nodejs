export class Todo{
    constructor(ID, Description, isChecked, Deleted, CreatedDate, ModifiedDate){
        this.ID = ID;
        this.Description = Description;
        this.isChecked  = isChecked;
        this.Deleted = Deleted; 
        this.CreatedDate = CreatedDate; 
        this.ModifiedDate = ModifiedDate;
    };
}