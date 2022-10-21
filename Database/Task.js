import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("user.db");


const createTaskTable=()=>{
    console.log("Creating task table");

    db.transaction((tx)=>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS task "
            +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, TASK TEXT, DATE TEXT)",
            [],

            (txObj, result)=>{console.log("TODO table created successuflly ");},
            (txObj, error)=>{console.log("TODO table creation ERROR"+error.message);},

        );
    })
}


const fetchAllTask=(callback)=>{
    db.transaction((tx)=>{
        tx.executeSql(
            "SELECT * FROM task",
            [],
            (txObj, { rows: {_array} })=>{
                callback(_array)
            },

            (txObj, error)=>{console.log("Problem fetching all task "+error.message);}
        )
    })
}

const setAllTask=(task, date)=>{
    db.transaction((tx)=>{
        tx.executeSql(
            "INSERT INTO task (TASK, DATE) VALUES (?, ?)",
            [task, date],

            (txObj, result)=>{console.log("Insertion successfully "+result.rowsAffected);},
            (txObj, error)=>{console.log("Problem inserting in task "+error.message);}
        )
    })
}

const updateTask=(id, task, date)=>{
    db.transaction((tx)=>{
        tx.executeSql(
            "UPDATE task SET TASK = ?, DATE = ? WHERE ID = ?;",
            [task, date, id],

            (txObj, result)=>{
                if(result.rowsAffected > 0){
                    console.log("Updated successfully "+result.rowsAffected);
                }
            },
            (txObj, error)=>{console.log("Problem inserting in task "+error.message);}
        )
    })
}

const deleteAllTask=()=>{
    db.transaction((tx)=>{
        tx.executeSql(
            "DELETE FROM task;",
            [],

            (txObj, result)=>{console.log("Deletion successfully "+result.rowsAffected);},
            (txObj, error)=>{console.log("Problem deleting all "+error.message);}
        )
    })
}

const deleteTask=(id)=>{
    db.transaction((tx)=>{
        tx.executeSql(
            "DELETE FROM task WHERE ID = ?;",
            [id],

            (txObj, result)=>{console.log("Deletion successfully "+result.rowsAffected);},
            (txObj, error)=>{console.log("Problem deleting all "+error.message);}
        )
    })
}



export {
    createTaskTable, fetchAllTask, setAllTask, 
    updateTask, deleteAllTask, deleteTask
}
