import { useEffect, useState } from "react";
import { getMachines, getPiecesFromMachines } from "../services/machines";

export function useMachines(selectedALines, search, debouncedSearch) {
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        getMachines(selectedALines, search).then(setMachines);
    }, [selectedALines, debouncedSearch]);
    return machines;
}

export function useSelectedMachine(name) {
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
        getPiecesFromMachines(name).then(setPieces);
    }, [name])
    return pieces;
}