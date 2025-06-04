import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPA_PROJECT;
const supabaseAnonKey = import.meta.env.VITE_SUPA_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Prayers by userId
export const getPrayersByUserId = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('Prayers')
      .select('*')
      .eq('userId', userId);
    
    if (error) {
      throw error;
    }
    
    return { data };
  } catch (error) {
    console.error('Error fetching prayers:', error);
    return { error };
  }
};

// Prayers by groupID with profile name
export const getPrayersByGroupId = async (groupId) => {
  try {
    const { data, error } = await supabase
      .from('Prayers')
      .select(`
        *,
        profiles (
          name
        )
      `)
      .eq('groupId', groupId);
    
    if (error) {
      throw error;
    }
    
    // Flatten the profiles data into the prayer objects
    const formattedData = data.map(prayer => ({
      ...prayer,
      profileName: prayer.profiles ? prayer.profiles.name : null,
      profiles: undefined, // Remove the original profiles object
    }));
    
    return { data: formattedData };
  } catch (error) {
    console.error('Error fetching prayers:', error);
    return { error };
  }
};

// get all groups that include userId

export const getGroupsForUser = async (userId) => {
  try {
    const { data: groupMembers, error: membersError } = await supabase
      .from('group_members')
      .select('group_id')
      .eq('user_id', userId);

    if (membersError) {
      throw membersError;
    }

    if (!groupMembers || groupMembers.length === 0) {
      return { data: [] }; // Return empty array in consistent structure
    }

    const groupIds = groupMembers.map(member => member.group_id);

    const { data, error } = await supabase
      .from('Groups')
      .select('*')
      .in('group_id', groupIds);

    if (error) {
      throw error;
    }

    return { data }; // Return data in consistent structure

  } catch (error) {
    console.error("Error fetching groups:", error);
    return { error }; // Return error in consistent structure
  }
};

export const newPrayer = async (userId, prayerTitle, prayerText, groupId = null) => {
  try {
    const { data, error } = await supabase
      .from('Prayers')
      .insert([
        {
          userId,
          title: prayerTitle,
          prayer_text: prayerText,
          groupId, // Include groupId
          answered: false, // Default value for answered
        },
      ]);

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    console.error('Error adding prayer:', error);
    return { error };
  }
};
