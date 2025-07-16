import { useState, lazy, Suspense, useRef, useEffect } from "react";
import PaginationControls from "@/components/ui/Pagination/Pagination.jsx";
import { IoSearch } from "react-icons/io5";
import {
    Spinner,
    Input,
    InputGroup,
    Table,
    CloseButton,
} from "@chakra-ui/react";
import { SelectAssemblyLine } from "../../components/ui/Select/Select.jsx";
import MachineDetails from "./MachineDetails.jsx";
import { useMachines } from "../../hooks/useMachines";
import { useDebounce } from "@uidotdev/usehooks";
import { EmptyError } from "@/components/ui/EmptyStates";
import "./Machines.css";
import { Helix } from "ldrs/react";
import "ldrs/react/Helix.css";

const DialogComponent = lazy(() =>
    import("../../components/dialog/Dialog.jsx")
);

function MachinesTable({ machines, handleClick }) {
    return (
        <Table.Root interactive>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                    <Table.ColumnHeader>Descripción</Table.ColumnHeader>
                    <Table.ColumnHeader>Línea</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {machines.map((machine, index) => (
                    <Table.Row
                        key={index}
                        onClick={() => handleClick(machine)}
                        _hover={{ cursor: "pointer" }}
                    >
                        <Table.Cell>{machine.name}</Table.Cell>
                        <Table.Cell>{machine.description}</Table.Cell>
                        <Table.Cell>{machine.aLine}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}

export default function MachinesPage() {
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [selectedMachineData, setSelectedMachineData] = useState();
    const [selectedALines, setSelectedAlines] = useState([]);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);
    const machines = useMachines(selectedALines, search, debouncedSearch);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const siblings = 2; // Número de páginas antes y después de la actual
    const totalPages = Math.ceil(machines.length / pageSize);

    // Si cambias páginaSize resetea a 1
    const handleSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    // Define slice
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageMachines = machines.slice(start, end);

    const handleAssemblyLineChange = (value) => {
        setSelectedAlines(value);
    };

    const handleOnClickMachine = (data) => {
        setSelectedMachineData(data);
        setShowDetailsDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDetailsDialog(false);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const inputRef = (useRef < HTMLInputElement) | (null > null);

    const endElement = search ? (
        <CloseButton
            size="xs"
            onClick={() => {
                setSearch("");
                inputRef.current?.focus();
            }}
            me="-2"
        />
    ) : null;

    return (
        <main>
            <div className="search-bar">
                <SelectAssemblyLine dataFromChild={handleAssemblyLineChange} />
                <div className="search-input-machines">
                    <InputGroup
                        startElement={<IoSearch className="search-icon" />}
                        endElement={endElement}
                    >
                        <Input
                            className="search-machines"
                            placeholder="Buscar..."
                            variant="flushed"
                            value={search}
                            onChange={handleSearch}
                        />
                    </InputGroup>
                </div>
            </div>
            {totalPages !== 0 ? (
                <>
                    <div className="table-machines">
                        {pageMachines ? (
                            <MachinesTable
                                machines={pageMachines}
                                handleClick={handleOnClickMachine}
                            />
                        ) : null}
                    </div>
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={handleSizeChange}
                        siblingCount={siblings}
                    />
                </>
            ) : search !== "" ? (
                <EmptyError description="Ninguna máquina coincide con la busqueda" />
            ) : null}
            <Suspense
                fallback={
                    <div className="fallback">
                        <Helix
                            size="70"
                            speed="2.5"
                            color="black"
                        />
                    </div>
                }
            >
                <DialogComponent
                    scrollBehavior="inside"
                    size="cover"
                    title="Detalles de la máquina"
                    content={
                        selectedMachineData && (
                            <MachineDetails data={selectedMachineData} />
                        )
                    }
                    open={showDetailsDialog}
                    close={handleCloseDialog}
                    placement="center"
                    motionPreset="slide-in-bottom"
                />
            </Suspense>
        </main>
    );
}
