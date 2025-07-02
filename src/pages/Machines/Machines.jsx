import { useState, useEffect, lazy, Suspense } from "react";
import supabase from "../../utils/supabase";
import { Spinner } from "@chakra-ui/react";
import { Select } from "../../components/ui/Select/Select.jsx";
import MachineDetails from "./MachineDetails.jsx";
import DialogComponent from "../../components/dialog/Dialog.jsx";
import "./Machines.css";

const CardComponent = lazy(() =>
    import("../../components/card/Card.jsx")
);

export default function MachinesPage() {
    const [machines, setMachines] = useState([]);
    const [assemblyLines, setAssemblyLines] = useState([]);
    const [selectedALines, setSelectedAlines] = useState([]);
    const [filteredMachines, setFilteredMachines] = useState(machines);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [selectedCardData, setSelectedCardData] = useState();

    const handleAssemblyLineChange = (value) => {
        setSelectedAlines(value);
    };

    useEffect(() => {
        async function getMachines() {
            const { data: machines } = await supabase.from("Machines").select();
            setMachines(machines);
            setFilteredMachines(machines);
        }
        getMachines();
    }, []);

    useEffect(() => {
        async function getAssemblyLines() {
            const { data: assemblyLines } = await supabase
                .from("Assembly Lines")
                .select();
            setAssemblyLines(assemblyLines);
        }
        getAssemblyLines();
    }, []);

    useEffect(() => {
        setFilteredMachines(
            selectedALines.length !== 0
                ? machines.filter((machine) =>
                      selectedALines.includes(machine.assembly_line)
                  )
                : machines
        );
    }, [selectedALines]);

    const handleOnClickCard = (data) => {
        setSelectedCardData(data);
        setShowDetailsDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDetailsDialog(false);
    };

    return (
        <main>
            <Select
                values={assemblyLines}
                dataFromChild={handleAssemblyLineChange}
            />
            <Suspense className="loader" fallback={<Spinner color="yellow.500"/>}>
                <div className="grid-machines">
                    {filteredMachines.map((machine, index) => (
                        <CardComponent
                            className="machines-card"
                            key={index}
                            title={machine.name}
                            description={machine.description}
                            footer={machine.assembly_line}
                            onClick={() => handleOnClickCard(machine)}
                        />
                    ))}
                </div>
            </Suspense>
            <DialogComponent
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
        </main>
    );
}
