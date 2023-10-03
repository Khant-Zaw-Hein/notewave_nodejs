var config = require('../dbconfig');
const sql = require('mssql');

const getAllTodoList = async () => {
    try {
        let pool = await sql.connect(config);
        let todoList = await pool.request().query('SELECT * FROM To_do_List WHERE Deleted = 0');
        return todoList.recordsets;
    } catch (err) {
        console.log(err);
    }
}
const getAllTodoListByUserAccountId = async (id) => {
    try {
        let pool = await sql.connect(config);
        let todoList = await pool.request()
            .input('input', sql.UniqueIdentifier , id)
            .query('SELECT * FROM To_do_List WHERE UserAccountId = @input AND Deleted = 0'); // @input to prevent sql injection
        return todoList.recordsets;
    } catch (err) {
        console.log(err);
    }
}
const getTodoById = async (id) => {
    try {
        let pool = await sql.connect(config);
        let todoList = await pool.request()
            .input('input', sql.Int, id)
            .query('SELECT * FROM To_do_List WHERE id = ' + id);
        return todoList.recordsets;
    } catch (err) {
        console.log(err);
    }
}
const deleteTodoById = async (id) => {
    try {
      let pool = await sql.connect(config);
      let todoList = await pool.request()
        .input('id', sql.Int, id)
        .input('modifiedDate', sql.DateTime, new Date())
        .query('UPDATE To_do_List SET Deleted = 1, ModifiedDate = @modifiedDate WHERE ID = @id');
      
      console.log("Inside delete transaction");
      return todoList.recordsets;
    } catch (err) {
      console.log(err);
    }
  }
  async function addTodo(id, Description) {
    try {
        let pool = await sql.connect(config);
        
        let insertTodo = await pool.request()
            // .input('Id', sql.Int, todoModel.Id)
            .input('Description', sql.NVarChar, Description)
            .input('isChecked', sql.Bit, false)
            .input('Deleted', sql.Bit, false)
            .input('CreatedDate', sql.DateTime, new Date())
            .input('UserAccountId', sql.UniqueIdentifier, id)
            .execute('InsertTodo');
        return insertTodo.recordsets;
    } catch (ex) {
        console.log(ex);
    }
}
const editTodoById = async (id, desc) => {
    try {
        let pool = await sql.connect(config);
        console.log ("id", id)
        console.log ("desc: ", desc);
        const query = `UPDATE To_do_List SET Description = '${desc}' WHERE id = ${id}`
        console.log(query)
        let todoList = await pool.request()
            .input('input', sql.Int, id)
            .input('modifiedDate', sql.DateTime, new Date())
            .query(`UPDATE To_do_List SET Description = '${desc}', ModifiedDate = @modifiedDate
              WHERE id = ${id}`);
        return todoList.recordsets;
    } catch (err) {
        console.log(err);
    }
}
const UpdateTodoCheckboxById = async (id, isChecked) => {
    try {
        let pool = await sql.connect(config);
        let checkStatus = isChecked === 'true' ? true : false;
        const query = `UPDATE To_do_List SET isChecked = ${checkStatus} WHERE id = ${id}`
        console.log(query)

        let todoList = await pool.request()
            .input('input', sql.Int, id)
            .input('modifiedDate', sql.DateTime, new Date())
            .input('checkboxStatus', sql.Bit, checkStatus)
            .query(`UPDATE To_do_List SET isChecked = @checkboxStatus, ModifiedDate = @modifiedDate
              WHERE id = ${id}`);
        return todoList.recordsets;
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    getAllTodoList: getAllTodoList,
    getTodoById: getTodoById,
    addTodo: addTodo,
    deleteTodoById: deleteTodoById,
    editTodoById: editTodoById,
    UpdateTodoCheckboxById : UpdateTodoCheckboxById,
    getAllTodoListByUserAccountId : getAllTodoListByUserAccountId
}