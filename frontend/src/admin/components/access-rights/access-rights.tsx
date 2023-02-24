import React, {useEffect, useState} from "react";
import "./access-rights.scss";
import EditableTable from "../editable-table/editable-table";

export default function AccessRights() {
    const [jsonData, setJsonData] = useState<any[]>([]);

    useEffect(() => {
        fetch("../frontend/src/admin/users.json")
            .then((response) => response.json())
            .then((data) => setJsonData(data));
    }, []);

    return (
        <div className="c-access-rights">
            <div className="c-access-rights__header">
                <h3>Access rights</h3>
                <button>Create group</button>
            </div>
            <>
                <EditableTable user={jsonData} />

            </>
        </div>
    )
}