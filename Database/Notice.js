import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todo.db");


const createNoticeTable=()=>{
    console.log("Creating NOTICE table");

    db.transaction((tx)=>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS notice"
            +" (ID INTEGER PRIMARY KEY AUTOINCREMENT, NOTICE TEXT, ANNOUNCEMENT TEXT)",
            [],

            (txObj, result)=>{console.log("Notice table created successuflly ");},
            (txObj, error)=>{console.log("Notice table creation ERROR"+error.message);},

        );
    })

}

const fetchAllNotice=(callback)=>{
    db.transaction((tx)=>{
        tx.executeSql(
            "SELECT * FROM notice",
            [],
            (txObj, { rows: {_array} })=>{
                // console.log("returning ", _array);
                callback(_array)
            },

            (txObj, error)=>{console.log("Problem fetching all notices "+error.message);}
        )
    })
}

const setNotice=(notice, type)=>{
    console.log("Database - inserting in to notice");
    db.transaction((tx)=>{
        tx.executeSql(
            "INSERT INTO notice (NOTICE, ANNOUNCEMENT) VALUES (?, ?)",
            [notice, type],

            (txObj, result)=>{console.log("Insertion successfully "+result.rowsAffected);},
            (txObj, error)=>{console.log("Problem inserting in task "+error.message);}
        )
    })
}

const deleteNotice=(id)=>{
    db.transaction((tx)=>{
        tx.executeSql(
            "DELETE FROM notice WHERE ID = ?;",
            [id],

            (txObj, result)=>{console.log("Deletion successfully "+result.rowsAffected);},
            (txObj, error)=>{console.log("Problem deleting all "+error.message);}
        )
    })
}




export { 
    createNoticeTable, 
    fetchAllNotice,
    setNotice,
    deleteNotice,
}