import supabase from "../utils/supabase";

export async function getPieces(workshop, search, multiple) {
  let query = supabase.from("Pieces").select();

  if (workshop !== "all") {
    query = query.eq("workshop", workshop);
  }

  if (multiple.length !== 0) {
    query = query.in("name", multiple);
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
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
  let machineStock = await supabase
    .from("machine_pieces")
    .select()
    .ilike("piece", `${piece}`);
  let warehouseStock = await supabase
    .from("Warehouse")
    .select()
    .ilike("piece", `${piece}`);

  return {
    machineStock: machineStock.data,
    warehouseStock: warehouseStock.data,
  };
}

// export async function getPiecesFromWarehouse(piece) {
//     let query = supabase.from("Warehouse").select();

//     if (piece !== "") {
//         query = query.eq("piece", `${piece}`);
//     }

//     const { data: pieces } = await query;

//     return pieces;
// }
