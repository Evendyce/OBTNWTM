// src/lib/stores/auth.ts
import { writable } from 'svelte/store';
import { supabase } from '$lib/api/supabaseClient';
import { getUserRole } from '$lib/api/getUserRole';
import type { Session } from '@supabase/supabase-js';

export const user = writable<{ session: Session | null; role: string | null }>({ session: null, role: null });

supabase.auth.getSession().then(async (session) => {
	const role = session.data.session ? await getUserRole(session.data.session.user.id) : null;
	user.set({ session: session.data.session, role });
});

supabase.auth.onAuthStateChange(async (_event, session) => {
	const role = session ? await getUserRole(session.user.id) : null;
	user.set({ session, role });
});
