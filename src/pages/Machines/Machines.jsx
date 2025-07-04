import { useState, useEffect, lazy, Suspense } from "react";
import { IoSearch } from "react-icons/io5";
import { Spinner, Input, InputGroup } from "@chakra-ui/react";
import { SelectAssemblyLine } from "../../components/ui/Select/Select.jsx";
import MachineDetails from "./MachineDetails.jsx";
import { useMachines } from "../../hooks/useMachines";
import { useDebounce } from "@uidotdev/usehooks";
import "./Machines.css";

const DialogComponent = lazy(() =>
    import("../../components/dialog/Dialog.jsx")
);
const CardComponent = lazy(() => import("../../components/card/Card.jsx"));

export default function MachinesPage() {
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [selectedCardData, setSelectedCardData] = useState();
    const [selectedALines, setSelectedAlines] = useState([]);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);
    const machines = useMachines(selectedALines, search, debouncedSearch);

    const handleAssemblyLineChange = (value) => {
        setSelectedAlines(value);
    };

    const handleOnClickCard = (data) => {
        setSelectedCardData(data);
        setShowDetailsDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDetailsDialog(false);
    };

    return (
        <main>
            <div className="search-bar">
                <SelectAssemblyLine dataFromChild={handleAssemblyLineChange} />
                <div className="search-input-machines">
                    <InputGroup
                        startElement={<IoSearch className="search-icon" />}>
                        <Input
                            className="search-machines"
                            placeholder="Buscar..."
                            variant="flushed"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </div>
            </div>
            <Suspense
                className="loader"
                fallback={<Spinner color="yellow.500" />}>
                <div className="grid-machines">
                    {machines
                        ? machines.map((machine, index) => (
                              <CardComponent
                                  className="machines-card"
                                  key={index}
                                  title={machine.name}
                                  description={machine.description}
                                  footer={machine.aLine}
                                  onClick={() => handleOnClickCard(machine)}
                              />
                          ))
                        : null}
                </div>
            </Suspense>
            <Suspense fallback={<Spinner color="yellow.500" />}>
                <DialogComponent
                    scrollBehavior="inside"
                    size="cover"
                    title="Detalles de la máquina"
                    content={
                        selectedCardData && (
                            <MachineDetails data={selectedCardData} />
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
