export interface TableColumn<T> {
    key: keyof T | string;

    header: TableHeader;

    render?: (value: T[keyof T], rowData: T, index: number) => React.ReactNode;
}
interface TableConfigProps<T> {
    columns: TableColumn<T>[];
    dataSource: T[];
    isLoading?: boolean;
    isError?: boolean | string;
}

function Table<T>({ columns, dataSource, isLoading = false, isError = false }: TableConfigProps<T>) {
    return (
        <div className="overflow-x-auto">
            <table className="table rounded-md border shadow-md">
                <thead>
                    <tr>
                        {columns.map(column => (
                            <TableHeader key={column.key as string | number} render={column.header} />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <>
                            <div className="grid h-full place-content-center">
                                <span className="loading loading-dots w-32"></span>
                            </div>
                        </>
                    ) : isError ? (
                        <div className="grid h-full place-content-center">
                            <span className="text-center text-3xl font-bold text-red-500 drop-shadow-md">请求数据出现了问题</span>
                        </div>
                    ) : (
                        dataSource.map((rowData, index) => <TableRow key={index} columns={columns} rowData={rowData} index={index} />)
                    )}
                </tbody>
            </table>
        </div>
    );
}

type TableHeader = string | React.ReactNode;

function TableHeader({ render }: { render: TableHeader }) {
    return <th>{render}</th>;
}

interface TableRowProps<T> {
    columns: TableColumn<T>[];
    rowData: T;
    index: number;
}

function TableRow<T>({ columns, rowData, index }: TableRowProps<T>) {
    return (
        <tr className="hover:bg-slate-100">
            {columns.map(column => (
                <TableRowCell
                    key={column.key as string | number}
                    rowData={rowData}
                    value={rowData[column.key as keyof T]}
                    index={index}
                    render={column.render}
                />
            ))}
        </tr>
    );
}

interface TableRowCellProps<T> {
    rowData: T;
    value: T[keyof T];
    index: number;
    render?: (value: T[keyof T], rowData: T, index: number) => React.ReactNode;
    children?: (value: T[keyof T], rowData: T, index: number) => React.ReactNode;
}

function TableRowCell<T>({ render, rowData, value, index, children }: TableRowCellProps<T>) {
    if (children) {
        return <td>{children(value, rowData, index)}</td>;
    } else if (render) {
        return <td>{render(value, rowData, index)}</td>;
    } else {
        return <td>{JSON.stringify(value)}</td>;
    }
}

export default Table;
