import "./MachineDetails.css";
import { Separator, Table, Text } from "@chakra-ui/react";
import { useSelectedMachine } from "@/hooks/useMachines";
import { usePieces } from "@/hooks/usePieces";
import { useState, useMemo, useRef } from "react";
import PaginationControls from "@/components/ui/Pagination/Pagination.jsx";
import { TabComponent } from "@/components/ui/tab-component";
import { EmptyError } from "@/components/ui/EmptyStates";

const tabData = [
    {
        id: "summary",
        title: "Máquina",
    },
    {
        id: "pieces",
        title: "Piezas",
    },
];

function PieceInfoTable({ pieces }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const siblings = 2; // Número de páginas antes y después de la actual

    // Recalcula cuando cambien props
    const refs = useMemo(() => pieces.map((p) => p.piece), [pieces]);
    if (refs.length === 0) {
        return <EmptyError />;
    }
    const details = usePieces({ multiple: refs });

    const totalPages = Math.ceil(pieces.length / pageSize);

    // Si cambias páginaSize resetea a 1
    const handleSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    // Define slice
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageDetails = details.slice(start, end);
    const pageAmounts = pieces.slice(start, end).map((p) => p.amount);

    return (
        <>
            <Table.Root stickyHeader>
                <Table.ColumnGroup>
                    <Table.Column htmlWidth="10%" />
                    <Table.Column htmlWidth="2%" />
                    <Table.Column/>
                </Table.ColumnGroup>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Referencia</Table.ColumnHeader>
                        <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
                        <Table.ColumnHeader>Descripción</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {pageDetails.map((piece, idx) => (
                        <Table.Row key={piece.id}>
                            <Table.Cell>{piece.name}</Table.Cell>
                            <Table.Cell>
                                <Text textStyle="xl">{pageAmounts[idx]}</Text>
                            </Table.Cell>
                            <Table.Cell>
                                {piece.description || "Sin descripción"}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={handleSizeChange}
                siblingCount={siblings}
            />
        </>
    );
}

export default function MachineDetails({ data }) {
    const pieces = useSelectedMachine(data.name);
    const [selectedTab, setSelectedTab] = useState("summary");

    const handleTabChange = (e) => {
        setSelectedTab(e.value);
    };

    return (
        <>
            <TabComponent
                tabContent={tabData}
                defaultValue={"summary"}
                dataFromChild={handleTabChange}
            />
            <main className="container">
                {selectedTab === "summary" ? (
                    <div className="machine-related-content">
                        <div className="title">{data.name}</div>
                        <Separator
                            orientation="vertical"
                            size="md"
                        />
                        <div className="body">
                            <div className="description">
                                {data.description}
                            </div>
                            <div className="assembly-line">{data.aLine}</div>
                            <div className="additional-content"></div>
                        </div>
                    </div>
                ) : (
                    <div className="piece-related-content">
                        <div className="title">Piezas en la máquina</div>
                        <div className="piece-body">
                            <PieceInfoTable pieces={pieces} />
                        </div>
                        <div className="additional-content"></div>
                    </div>
                )}
            </main>
        </>
    );
}
