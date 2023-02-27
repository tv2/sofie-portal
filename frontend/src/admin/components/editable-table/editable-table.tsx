import React, { useState, useEffect } from "react";
import { User } from "../../models/user";
import "./editable-table.scss";
import EditRowIcon from "../edit-row-icon/edit-row-icon";
import DeleteRowIcon from "../delete-row-icon/delete-row-icon";

export default function EditableTable() {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        fetch("./src/admin/users.json")
            .then((response) => response.json())
            .then((data) => setData(data.users));
    }, []);

    function handleAddRow() {
        setData([...data, { id: "", name: "", emberTarget: "", accessRightGroups: [] }]);
    }

    function handleDeleteRow(index: number) {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value)
    }

    return (
        <div className="c-editable-table">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Target</th>
                    <th><button onClick={handleAddRow}>Add machine</button></th>
                </tr>
                </thead>
                <tbody>
                {data &&
                    data.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    value={row.id}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.name}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.emberTarget}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleDeleteRow(index)}>
                                    <DeleteRowIcon/>
                                </button>
                                <button>
                                    <EditRowIcon/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
