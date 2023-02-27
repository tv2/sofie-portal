import React from "react";
import "./access-rights.scss";
import EditableTable from "../editable-table/editable-table";

export default function AccessRights() {

    return (
        <div className="c-access-rights">
            <div className="c-access-rights__header">
                <h3>Access rights</h3>
                <button>Create group</button>
            </div>
            <EditableTable />
        </div>
    )
}