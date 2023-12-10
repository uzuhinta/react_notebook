import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}

export async function createEditCabin(newCabinData, id) {
  const { created_at, ...newCabin } = newCabinData;
  console.log('newCabin', newCabin, id);
  const hasImagePath = typeof newCabin.image === 'string';

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update(newCabin).eq('id', id);

  const { data, error } = await query.select().single();

  console.log('newData', data);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  if (hasImagePath) return data;

  const { storageData, error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(`${imageName}`, newCabin.image);

  console.log('storageData', storageData);

  if (storageError) {
    console.error(storageError);
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error(
      'Cabins image could bet be uploaded and the cabin was not created'
    );
  }

  return data;
}
