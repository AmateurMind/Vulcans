// Run this mutation to seed all team members
// Use the Convex dashboard or call this from the admin panel

import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Team members data from the spreadsheet
const TEAM_MEMBERS = [
    {
        name: "Shreyas Kumbhar",
        email: "kumbhar_shreyas_entc@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/shreyaskumbhar185",
        role: "Captain",
        department: "ENTC",
    },
    {
        name: "Chase Gunjal",
        email: "chasegunjal@gmail.com",
        linkedIn: "https://www.linkedin.com/in/chase-gunjal-b5a1b92b4",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Asmi Patil",
        email: "patil_asmi_entc@moderncoe.edu.in",
        linkedIn: "#",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Advait Deo",
        email: "deo_advait_entc@moderncoe.edu.in",
        linkedIn: "#",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Snehal Shirur",
        email: "snehal_shirur_entc@moderncoe.edu.in",
        linkedIn: "#",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Aryan Shirkhe",
        email: "aryan_shirke_entc@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/aryanshirke",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Harshal Raje",
        email: "harshal_raje_mech@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/harshal-raje-a0b391323",
        role: "Team Member",
        department: "Mech",
    },
    {
        name: "Vaishanvi Sutar",
        email: "vaishnavi_sutar_mech@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/vaishnavi-sutar-2bba892b4",
        role: "Team Member",
        department: "Mech",
    },
    {
        name: "Janhavi Pawar",
        email: "pawar_janhavi_entc@moderncoe.edu.in",
        linkedIn: "#",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Pradyumna Rawas",
        email: "pradyumna_rawas_entc@moderncoe.edu.in",
        linkedIn: "#",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Sarvesh Daphale",
        email: "sarvesh_daphale_entc@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/sarvesh-daphale-3443a8316",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Ayush Tiwari",
        email: "ayush_tiwari_ece@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/coolayushtiwari",
        role: "Team Member",
        department: "ECE",
    },
    {
        name: "Pranav Shinde",
        email: "pranav_shinde_entc@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/pranav-shinde-43a2333a1",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Vaibhav Pawar",
        email: "vaibhav_pawar_entc@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/pawar-vaibhav-105834383",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Aditya Darekar",
        email: "aditya_darekar_entc@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/aditya-darekar-5b40a73b4",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Vedant Thakare",
        email: "vedant_thakare_mech@moderncoe.edu.in",
        linkedIn: "#",
        role: "Team Member",
        department: "Mech",
    },
    {
        name: "Prathmesh Shingade",
        email: "prathamesh_shingade_mech@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/prathamesh-shingade-646266351",
        role: "Team Member",
        department: "Mech",
    },
    {
        name: "Yashodhan Kulkarni",
        email: "yashodhan_kulkarni_comp@modercoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/yashodhan-k-55ab15229",
        role: "Team Member",
        department: "Comp",
    },
    {
        name: "Athrav Ghorpade",
        email: "atharv_ghorpade_elect@moderncoe.edu.in",
        linkedIn: "#",
        role: "Team Member",
        department: "Elect",
    },
    {
        name: "Anand Jad",
        email: "anand_jad_entc@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/anandjad",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Ashwin Bobade",
        email: "ashwin_bobade_entc@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/ashwinbobade",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Meherdeep Chapade",
        email: "mehardeep_chapade_ece@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/meherdeep-chapade-40136833b",
        role: "Team Member",
        department: "ECE",
    },
    {
        name: "Harsh Jain",
        email: "jain_harsh_entc@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/harsh-jain-853b31341",
        role: "Team Member",
        department: "AI&DS",
    },
    {
        name: "Viraj jadhao",
        email: "viraj_jadhao_comp@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/viraj-jadhao-0771b830b",
        role: "Team Member",
        department: "Comp",
    },
    {
        name: "Yash Doke",
        email: "yash_doke_comp@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/yash-doke",
        role: "Team Member",
        department: "Comp",
    },
    {
        name: "Aditya Garad",
        email: "aditya_garad_entc@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/aditya-garad-45473837a",
        role: "Team Member",
        department: "ENTC",
    },
    {
        name: "Vedant Kaulgekar",
        email: "vedant_kaulgekar_aiml@moderncoe.edu.in",
        linkedIn: "https://www.linkedin.com/in/vedant-kaulgekar",
        role: "Team Member",
        department: "AIML",
    },
    {
        name: "Laukik Meshram",
        email: "laukik_meshram_entc@moderncoe.edu.in",
        linkedIn: "#",
        role: "Team Member",
        department: "ENTC",
    },
];

export const seedTeamMembers = mutation({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const results = [];
        for (const member of TEAM_MEMBERS) {
            // Check if member already exists by email
            const existing = await ctx.db
                .query("teamMembers")
                .filter((q) => q.eq(q.field("email"), member.email))
                .first();

            if (!existing) {
                const id = await ctx.db.insert("teamMembers", {
                    ...member,
                    createdAt: Date.now(),
                });
                results.push({ id, name: member.name, status: "created" });
            } else {
                results.push({ id: existing._id, name: member.name, status: "already exists" });
            }
        }
        return results;
    },
});

// Public seed function - no auth required (for initial setup)
export const seedAll = mutation({
    args: {},
    handler: async (ctx) => {
        const results = [];
        for (const member of TEAM_MEMBERS) {
            const existing = await ctx.db
                .query("teamMembers")
                .filter((q) => q.eq(q.field("email"), member.email))
                .first();

            if (!existing) {
                const id = await ctx.db.insert("teamMembers", {
                    ...member,
                    createdAt: Date.now(),
                });
                results.push({ id, name: member.name, status: "created" });
            } else {
                results.push({ id: existing._id, name: member.name, status: "already exists" });
            }
        }
        return results;
    },
});
