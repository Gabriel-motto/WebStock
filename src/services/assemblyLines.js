import supabase from "../utils/supabase"

export async function getAssemblyLines( search ) {
    let query = supabase.from("Assembly Lines").select();

    if(search !== "") {
        query = query.ilike("name", `%${search}%`);
    }

    const { data: aLines } = await query;

    return aLines?.map((aLine) => ({
        id: aLine.id,
        name: aLine.name,
        description: aLine.description,
    }));
}