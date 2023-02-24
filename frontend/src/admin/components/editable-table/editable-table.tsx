import React, { useState, useEffect } from "react";
import { User } from "../../models/user";
import "./editable-table.scss";

interface EditableTableProps {}

export default function EditableTable({}: EditableTableProps) {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        fetch("./src/admin/users.json")
            .then((response) => response.json())
            .then((data) => setData(data.users));
    }, []);

    const handleAddRow = () => {
        setData([...data, { id: "", name: "", target: "" }]);
    };

    const handleDeleteRow = (index: number) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number,
        key: keyof User
    ) => {
        const newData = [...data];
        newData[index][key] = event.target.value;
        setData(newData);
    };

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
                                    onChange={(e) => handleInputChange(e, index, "id")}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.name}
                                    onChange={(e) => handleInputChange(e, index, "name")}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.target}
                                    onChange={(e) => handleInputChange(e, index, "target")}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleDeleteRow(index)}>Delete</button>
                                <button>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
