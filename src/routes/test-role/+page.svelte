<script lang="ts">
  import { supabase } from '$lib/api/supabaseClient';
  import { user } from '$lib/stores/auth';
  import { onMount } from 'svelte';

  let currentRole: string | null = null;

  onMount(async () => {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
      const { getUserRole } = await import('$lib/api/getUserRole');
      currentRole = await getUserRole(session.data.session.user.id);
    } else {
      currentRole = 'No user logged in';
    }
  });

  async function signInTest() {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'don.min.max@gmail.com',
      password: 'Theultimate1!'
    });

    if (error) alert(error.message);
    else location.reload(); // To retrigger onMount with session
  }
</script>

<h1>User Role Test</h1>
<p>Current Role: {currentRole}</p>

<button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow" on:click={signInTest}>
  🔐 Test Sign-In
</button>