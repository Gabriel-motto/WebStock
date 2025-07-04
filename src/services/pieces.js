import supabase from "../utils/supabase";

export async function getPieces(workshop, search) {
    let query = supabase.from("Pieces").select();

    if (workshop !== "all") {
        query = query.eq("workshop", workshop);
    }

    if (search !== "") {
        query = query.ilike("name", search);
    }

    const { data: pieces } = await query;

    return pieces?.map((piece) => ({
        id: piece.id,
        name: piece.name,
        description: piece.description,
        type: piece.type,
        brand: piece.brand,
        workshop: piece.workshop,
    }));
}

export async function getStockPiece(piece) {
    const machineStock = await supabase
        .from("machine_pieces")
        .select("amount")
        .eq("piece", `${piece}`);
    const warehouseStock = await supabase
        .from("Warehouse")
        .select("amount")
        .eq("piece", `${piece}`);

    return machineStock?.data[0].amount;
}

export async function getPiecesFromWarehouse(piece) {
    let query = supabase.from("Warehouse").select();

    if (piece !== "") {
        query = query.eq("piece", `${piece}`);
    }

    const { data: pieces } = await query;

    return pieces;
}
