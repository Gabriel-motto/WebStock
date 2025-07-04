import supabase from "../utils/supabase";


export async function getMachines(selectedALines, search) {
    let query = supabase.from("Machines").select();

    if (selectedALines.length > 0) {
        query = query.in("assembly_line", selectedALines);
    }

    if (search) {
        query = query.ilike("name", `%${search}%`);
    }
    
    const { data: machines } = await query;
    return machines?.map((machine) => ({
        id: machine.id,
        name: machine.name,
        description: machine.description,
        aLine: machine.assembly_line,
    }));
}

export async function getPiecesFromMachines(machine) {
    const { data: pieces } = await supabase.from("machine_pieces").select().eq("machine", machine);
    return pieces;
}