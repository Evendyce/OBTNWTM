import { supabase } from '$lib/api/supabaseClient';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';

export async function getUserRole(userId: string): Promise<string | null> {
	
	type UserRoleQuery = {
		role_id: string;
		roles: {
			name: string;
		};
	};

	const { data, error } = await supabase
		.from('user_roles')
		.select(`
			role_id,
			roles!user_roles_role_id_fkey (
			  name
			)
		  `)
		.eq('user_id', userId)
		.single();

	console.log("Fetched user role:", data);

	if (error || !data) {
		console.error('Failed to fetch user role:', error);
		return null;
	}

	return "";//data.roles?.name ?? null;
}