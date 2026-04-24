/**
 * ============================================
 * EventSync AI — Mock Data for All Screens
 * ============================================
 * 
 * Provides mock datasets used for UI development while the backend
 * is under construction. Provides structured types mimicking a database.
 */

import type { Event, Speaker, User, HelpDesk, Announcement, ScheduleItem } from "@/types";

// ---- Image URLs (from Stitch designs) ----
export const IMAGES = {
  heroLanding:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD9vSpS_pQX77lEev2RyEOb-TdoCKxNLtn2z8gwVzIq0qB6EIe7sURjmrrHrs7AyZTkngHqkrBlD8earNSgqUAJzU_cNygEiw8Nur10ePbsFCP4tY8BLKZDJ3VqYingaXeQWX1zTDxvaMTvB4OpTGNJIYtsFFoknpbI_pg7TNpLJFXD5jj5gDJPdBoJwJVwSERLO0KHxnVEOofHz8Fmz79ASIwOFRZq7dJr0fZeG45qDJB2lRetgniMEhoCpRtkQC_MwFeIOaVDOMw",
  eventFeatured:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAjdNNx7o2B0U6_1_Fj0Kwknju7c1XaW4q7b6TnQWEvo96_UCHaNM2OB4vQIJK8V3kzh91IWN4x0RyWyte2eJmriPeQV3xyNsdzsCHKk3oxXcQ529tvyfqeXCwuJfVlvJsyMPNcx6J_xjmOGOVeE0xAj4akdTJVmUyFU-dYDw3VDV-LiTaYWhLPcVD7y8ci587rl3gmqFmQuJkovgFr-Mdwl6qiOlXCYkPTXEXSV6xO_kOwj_J07rY8tt5nwcU8lWAdX5Am_4ke0Cs",
  eventHorizon:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qbaannd763-zT3KAXAiwfqM6439Tj_EhHiTygvqwp9VJpmnBf2qOyD8AzStJF2EcYS7GdszkaTY3mtQJdIih5ZvsFdrIQ5KW9atbzPOtDFsC82ESRItlJzCKKL2r3x3YV3Fm9eXowo_fGcQrK03BmMqp0nrXNrFsYgeo6Cjeru3oquOM0TBX_J9eCWcQWdU5DKOxnaTgNjU0_44xfZey5XVnUa3QvpxhmppzoQ16S8iIvolXe28g7iQ1ImuYYzAbxNlSmDeHt7M",
  eventTech:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC5SCfXudHmzwWapP0Q3E25P1QrjJ-rZXx0qVspGcgtJ2pLEV0eS7_SCKuOdUyjHvwiFqAYSuL9BK8opxYgdUfSpc0yJrD7SonV7-FDSpSasEwrj1KqGEY37Q_5BYVeNBaJo-ror5w0gQ_nPlL8LYbwhDONATyqdslDiwOrZmRzIflZAvNsF4sN58awV4XcWQS2wEGJtgt28Iin3xqc5JLaozMAgFS29zdJmRQoZGx_c6stqvcbXsiwZ8XLAMXSTrPrwDJATt2xt7c",
  eventDesignWorkshop:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCgCJUXAXHizB7eXBx0Bsm_DtfQz2um1MIP8sUSYGnrCBcKJGpGs8QRLghN2jd_oX3arnfCqmf9rlDb11dDu1ya1-lPqpsLJs9mY3AuscCzYmXPNvwR_oGN7772SxIkm6rMQKagKPtDc6F0TatX9xAMBaSaC0IsV5_EolRACUPnJKOUZ7sZLZXn7Z7Qr0eI14z2tUlYFskTjqGDw76Z93TGjohMcnD-7QS7TG5jkZBmfEjxt2GNhnA4fsfMnczoCZQSdwym4H1-UPw",
  eventStartupMixer:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD3T_-PPCmQdo-KrTp-aVsCrkHH1T_MwPIGhSNWyOUv88Yl6-OFwham7lpLvVwtRBDAbqyDzzlYvxpeSgZIhL3ER8Qj0s5KIqnOC7A-dscFNHoMhk4gZAYIK6Sfuteg1YLKG38RRDO0E4Lqxu4QvxC8DBYctNu1f4oQdQ4VzLUGRGmRKq2PO2do3Xl4n6__NFf922r27FoUdhk6N8-nnXj99luFRA1xGRxh94VrRa6czOapsagf7W5sUrSK9Ixtr4Wz-LX1F3uVpCE",
  eventDataScience:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBl14UMN7vkV2MhXVNUKIZbWQdiJNeaV4x_Yi02qQDg4QIB_R9idWhAJ1qx2SWeL4RBrE_nYR70L441C-9iWWr2af8V30cjGuYNzlLP-8N6EX9PhG5NXWSaGH4rnXa7wqlMUJgfsGhUyOpry2rsfYjhGQnrP2kJM85k7NndpiMLRtNBDYkSltDug4V1OKrwze_3lVwXbo4CdF9oJKSVqrw5XELuNSoU670mPEQ5jUYiLYL9AllpjkD3LyXIzbv36PawjuHoT51Onzk",
  eventDetailsBanner:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBGk7aeC2A_9HdWHYSiY4GXquhpVSfzMcUo-12B9xtTPi_FTmTHPufGQXeSiuT7T5DlFi00D2en542ZEFLFzTN8Fgg62t_xNQzv7bkwqaj-ojNMAd-Sysaqmshe1tQm0TPnuLVnipH9j8AopWvEaOmxoVslc-Fa5zP4xqO2yFlkFgHdw242YUokG6G3CwdQ11RSh1xG1bjlz2MFO0tRztqNEDJGJEpK4zPZl6hX-YUOll6whKIN6Ei4nACfcLNLSaoAwhoZsIay1uA",
  mapPlaceholder:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC3xE2hQuXzoGkEvuzQy16k5DS_p1HOz829EhIGGJSH0Y5mbiBA7lxgIETk7wUI0H0novCPtYelcYKPPG8WSbRl5yGXv30tEd6dbxCvOdYuaQ03Y7Asxex89HHmif0oz1M446EMBlHClyY54cKGmaIwNdOHwjiT5XP5A5Z5Z22ReOcmxyA3F-VWTxnJFJFv0dl79hPbQ3hBRJCc5wshZxWnHdm5yxYAQ8feDWUGbdPq8vb71waxWcTysKw71NH04Zy431yTPaXJhdg",
  nearbyMap:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDx8Ep3pffOCRB_tlRFNENbnphGUYKAdWyfozltu7M3g2LgZXGAZ7BIAqee9cSzcR8R4UgmWuyQLAbMOuA3bZBORrFRzgd78n762IlMQBG3t1m-Z-uCLV8lLTmcrSmNnF38tdmlRTdm2dbRhOvambmZi2zbrfFNwBQfdEdlKQ7N07rOrbg5u7gLd3yd9nKigAVDEOnIj0BJh04F4Qb_UkSUDhQDIFetIVthy_hS9WHUvqRQyOzxdtF3gf9G4oCVT2lrS7k1rIbUmu4",
  safetyFloorPlan:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAtcRNtxkiBK_e0HM476Liy2cB02jCKBVf4_0X_GL1hVDZ6_hrjgfwAxTy_5XEVxawp4u-lUCux1Vz1n71Y26fsj_0tu3Nbvn2gVWLPbUmpoN4bC1MHRytiW_ZFSfWiOCSxkjcjFQONrHuBCyUa1FWfsmG4sdbC_YN8jukmz5kffyuylPmsrtpnhlBOVCd0JewiYvWzqh4m3ygELZqgIiYfpi-aEl14RnmUssVBBS-VfUVHSdN70V1FT2DP-k0xUj9wZEogSmHjoiA",
  helpDeskStaff:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC3kk4c2c1aCAPmmVeADUlNtNYXvmm42MRPhLQl8woNO-DRqN_E4PcCHoJZyk-8cCHgjftwPxKMHiBfdwVP2KsxU6QxppUknBBWXtWWcnyk6Rvg5nSlljRqXbUv3OdEvEgZsumeeaFvLWW6b-nowwz9lLcKmdEmrPUFakuMUlrVrxX8E5NHTDTWCKeR6OXdX9AmN4dDVzJfMqaej1x23Mly8GQx3Bl-is2nlLPf_v0wfVMVa_GeLOZd_6QAHmrxYjZKUcWBRmT0cDw",
  speakerSarah:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDXFUxCrbyAyrOY1qF0LzDOof05EJNea33AqeH_kvFP6_7iDkRarHh1j5BjGF2IFLkjIvapEdOHuJfKJ3yGFpSvTbEYnwrZ_hIq7mOT56BOCgk_c_wyr9vtuIL3o5axZMSVepGGSR_KDBrvNo4s6jEsiDwcPGQio-AJIOvxYU9ZfQyfnWNPG4YsNmJ9xbl8Iop9GxLs9XaQCRBR1fZs1J6zN5YR6gPPy9S6Ohi1QSrCPodEkQw-LGRUsI9oD4GVLZaQ40HGRAB-j3k",
  speakerJames:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDYWdPCEyGo9veJpk5GTVhQWf_JBqmZFyjRSSo-aFZ2QLEFNmokW75wIsESpVtVoWssirM0t06cChmih4xInyhroYTI_m_FYLucGMTMRiYIXWd0zaQedwctGdzL42jsBL3jEIdNBuaTtV4Yn3rKMc-r7sh3sZW5JJCCYmLF6_UuNHxZqgEnAjJb25HVCmlKGh_JREaAU8vtwyMR7ADCScympPcUEWW3pti8NtNr--cDu7pStCzR7YGEbKVG8g87-CiDPpKha4UYlKI",
  speakerElena:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAOUHk6_hvIVKNEhEV6OIYRch5-p8F9xN07GUV20i-j21xniFDjtTW-X5VoDh4gcNUtnIe2mEHV6V5bnmkxEWcuBh5hxRaCRtLwhBb99pHZ6EqWRWdeI9CRmAPuqPS3VTEYX7IPSAvLouD_lipm6ZqIg_fZVJomkDiiQj0v_drlwDIrZSuhjzoV-bmqFKzCzzFacrsnxlrgtJmhbezhcS0QPjCviMLJxXuMp8uhRIAj0zsm9AzGBUN91ZMoCz-p95jzSecL20TciGs",
  networkSarah:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDgqo_HoHyTKvUjawX0v-s8Ex65vLNetpRR9g6XxxXucR-04PMw1kvuMSqSPAGwxoydHkol50TTAJeyof5WkwGdxnAzqJbo04zxuHWkKTINpNT7hTAu54HiEs0NQvkfcRvlcVli3hD5phhn7S9svNYR956RCwRP3WfDDUtCZphnGXlJl7dDv8GSA0f_v8pLxY6Cv86lW4jpRWNNOohMTcxZJ3afL_RKowzEE2A7vznSHU4lDKrmtqYIwY1WpyQAsdDlp8E6fJ_WcPw",
  networkMarcus:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD5ZL0Bkzjn2gvcRJg7a8Ya0Kxc21mccHrah1nSMeC33RBr2MBPISyJhpwYkLQ5WGkqMqs_r8Et81OXa4JzN3YZtIPqr2s4ELzgCDUJFt20p1U7epnt129WMhbSexweGSCc6vBX3RiHIy1I1oELIxko1eLSror3IvtYX8dEnGKYde8MYk8Jwg_EP9jFqfRtUoJN4IFkTEW91ahfxMhGFd3MY9t517twJ4G-7eJEsQwZSS5gOvhf0Iq_9yAFkyzPXsp-Noao-LrJFgA",
  networkElena:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBoduhlXVBv9GPDcsz935MUtMoxsTVGPMbK8FrCyudl4_kdJOvRRxxOgU1hZBmdlvR36sURV8foN7zQfrGfq8E1RqeEymx9dc7llPoemWTLkzaYEETx9Em48MLuxz8jrOblyMc4yWrit5BEghqoUG1VMFg1qvvEDAz54wtbdfrb8mgz61Dul9tgS-5kHwK6dv7B4pjDktUaac-bdrVlGkRNguSLy59ssctPghdzU8dgmxMpOJ-xdayOl_Fl6eE6dXMqmvIuqE4UEyk",
  networkDavid:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD5oRY8Di7hyon83HVMDUL3rJaXvZSuNaqp5LX4GNNYo-X6nWvgbJblnWmeK5MASRQpxxWC4IJAh1lKsOuJarEWJDZmlaYflVmbIILZV1NHESrRiZQhGihCqUoy5t5NmbVuLA86Okr1MdzIUCpdu91EMLe0Ya0vz88bLMoyZeDfugA8oi1wYqfNu3Zj6lVxWXNs743GgnNsWJbrARHalsb9SRttTXY6Pg2hk4VKFy29GJrvNFYtFBVZhZ4RkGYMHou6oGu_dyLBE70",
  avatarWoman1:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCp7a6ijH_mxVwdJCkSZ_2A_5SsK6FtXigCV_BhjQ8hSEu3DB6_kxJ68QmLn564nW8kBFa2cC6UsN7y1nUPA5PmBRH0ZzFDmLuLIg28XBNnamrMR1fRtM3HoVq_Y8ElbXXTa9A0JKpnWwfTYd2F1325oRCs8oF8GIPAWrDAyLvhXPQKhVcbYMnZ2ldAO2i0SrPfjMc3n-l7Xbyz97-jVZdu7dYrKWi5mUvV59SzOjAArZtY3HojIci_ORWXafjWGcM3cmuhA-8Qcfw",
  avatarMan1:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDaSlCsje1qafeKmo5zjFZCUFeNU84OMNgYU4MMassxH7goZWpE40ASQ63MUBsr5YTLTDf-qeM7rQ8gSpRXrSZwJLUY9myLaqXzGQpNQBnyTugRNqoVDF2o-2YLFgDW5_Nk4gxmlBHSrIsiQt4-ywwKJgokYADzUHPTHXtV116SeRVGSPg5OdTWLi4_P3YWdK2zEz48pSBpZ-QdVSSaMiPOK5zjCjIwJDIvGXqsmI4Nj8u79D_PBj1KY5xhChlEaUfN90wpnUv1Vwo",
  avatarWoman2:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDCSmp9A8mDF5VvKaKm9xAgpbSLYinTt2xtwvued0kl75dotAwMLHN_QhmydyiEfYrh9Cac5PYQFRWLu3Km6dcuDyMW3zUCWtdWWn4yIqUjJMi2CN5sCb7AUZ8HuvWW9bHckpkmKkVVpp21hfC95M2y9bqkHf6D_rlUcX2VnUE9bhBCT-meM6LBIH_xaGFQuQvgynzRCHrRphNCiKQ7J1c7XGqpL4T9YcFgplTiJ5exzt6edjKOPgyxuk8v78vCxvPRa_tZDpnEBJM",
  badgeAvatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDaSlCsje1qafeKmo5zjFZCUFeNU84OMNgYU4MMassxH7goZWpE40ASQ63MUBsr5YTLTDf-qeM7rQ8gSpRXrSZwJLUY9myLaqXzGQpNQBnyTugRNqoVDF2o-2YLFgDW5_Nk4gxmlBHSrIsiQt4-ywwKJgokYADzUHPTHXtV116SeRVGSPg5OdTWLi4_P3YWdK2zEz48pSBpZ-QdVSSaMiPOK5zjCjIwJDIvGXqsmI4Nj8u79D_PBj1KY5xhChlEaUfN90wpnUv1Vwo",
};

// ---- Speakers ----
export const speakers: Speaker[] = [
  { id: "s1", name: "Dr. Sarah Chen", role: "Neuro-Analyst", imageUrl: IMAGES.speakerSarah },
  { id: "s2", name: "James Wilson", role: "AI Architect", imageUrl: IMAGES.speakerJames },
  { id: "s3", name: "Elena Rodriguez", role: "Ethicist", imageUrl: IMAGES.speakerElena },
];

// ---- Schedule Items ----
export const scheduleItems: ScheduleItem[] = [
  {
    id: "sc1",
    time: "09:30 AM",
    title: "Keynote: The AI Singularity",
    description: "A deep dive into the next 10 years of computing.",
    isActive: true,
  },
  {
    id: "sc2",
    time: "11:00 AM",
    title: "Workshop: Neural Link SDK",
    description: "Hands-on session for developers using the latest API.",
  },
  {
    id: "sc3",
    time: "01:00 PM",
    title: "Lunch & Networking",
    description: "Catered networking break in the main lobby.",
  },
];

// ---- Dashboard Schedule ----
export const dashboardSchedule: ScheduleItem[] = [
  {
    id: "ds1",
    time: "09 AM",
    title: "Opening Keynote",
    description: "Hall A • Speaker: Dr. Aris",
    isActive: true,
  },
  {
    id: "ds2",
    time: "11 AM",
    title: "Deep Learning Workshop",
    description: "Room 302 • Lab Session",
  },
  {
    id: "ds3",
    time: "02 PM",
    title: "Networking Mixer",
    description: "Main Garden • Open Bar",
  },
];

// ---- Events ----
export const featuredEvent: Event = {
  id: "e1",
  title: "NeuralSync Global Summit 2024",
  description:
    "Explore the intersection of artificial intelligence and neurobiology. This year's summit brings together the world's leading minds to discuss how neural interfaces will reshape human productivity, accessibility, and digital interaction in the coming decade.",
  date: "OCT 24, 2024",
  time: "09:00 AM - 05:00 PM IST",
  location: "Jio World Convention Centre, Mumbai",
  address: "Bandra Kurla Complex, Mumbai, Maharashtra 400098",
  price: 2499,
  priceLabel: "₹2,499.00",
  category: "AI Innovation",
  tags: ["#AI2024", "#NeuralTech", "#Innovation"],
  imageUrl: IMAGES.eventFeatured,
  isFeatured: true,
  capacity: 500,
  registered: 342,
  speakers,
  schedule: scheduleItems,
};

export const events: Event[] = [
  featuredEvent,
  {
    id: "e2",
    title: "AI Design Patterns Workshop",
    description: "Hands-on workshop exploring modern AI design patterns.",
    date: "TOMORROW",
    time: "6:00 PM",
    location: "Creative Hub Bengaluru",
    address: "Koramangala, Bengaluru, Karnataka",
    price: null,
    priceLabel: "Free",
    category: "AI Tech",
    tags: ["#Design", "#AI"],
    imageUrl: IMAGES.eventDesignWorkshop,
    isFeatured: false,
    capacity: 50,
    registered: 38,
    speakers: [],
    schedule: [],
  },
  {
    id: "e3",
    title: "Startup Founders Mixer",
    description: "Networking event for startup founders and investors.",
    date: "OCT 26",
    time: "7:00 PM",
    location: "T-Hub, Hyderabad",
    address: "Knowledge City, Hyderabad, Telangana",
    price: 1500,
    priceLabel: "₹1,500.00",
    category: "Business",
    tags: ["#Startups", "#Networking"],
    imageUrl: IMAGES.eventStartupMixer,
    isFeatured: false,
    capacity: 100,
    registered: 72,
    speakers: [],
    schedule: [],
  },
  {
    id: "e4",
    title: "Data Science Intensive",
    description: "Full-day intensive course on data science fundamentals.",
    date: "OCT 28",
    time: "10:00 AM",
    location: "Remote Access",
    address: "Online",
    price: 4999,
    priceLabel: "₹4,999.00",
    category: "AI Tech",
    tags: ["#DataScience", "#ML"],
    imageUrl: IMAGES.eventDataScience,
    isFeatured: false,
    capacity: 200,
    registered: 156,
    speakers: [],
    schedule: [],
  },
];

    title: "India Tech Fest 2024",
    location: "Pune, Maharashtra",
    price: "₹999.00",
    date: "AUG 24",
    imageUrl: IMAGES.eventHorizon,
  },
  {
    id: "t2",
    title: "AI Conclave 2024",
    location: "Bangalore, KA",
    price: "Free",
    date: "SEP 02",
    imageUrl: IMAGES.eventTech,
  },

// ---- Networking Users ----
export const networkUsers: User[] = [
  {
    id: "u1",
    name: "Marcus Thorne",
    email: "marcus@nexuslab.com",
    role: "attendee",
    avatar: IMAGES.networkMarcus,
    title: "Head of Product",
    company: "NexusLab",
    interests: ["#AI", "#UXDesign", "#SaaS"],
  },
  {
    id: "u2",
    name: "Elena Rodriguez",
    email: "elena@creative.co",
    role: "attendee",
    avatar: IMAGES.networkElena,
    title: "Independent Visual Strategist",
    company: "",
    interests: ["#CreativeTech", "#DesignSystems"],
  },
  {
    id: "u3",
    name: "David Miller",
    email: "david@cloudstream.io",
    role: "attendee",
    avatar: IMAGES.networkDavid,
    title: "Founder",
    company: "CloudStream",
    interests: ["#Startups", "#Growth", "#Venture"],
  },
];

export const aiMatch = {
  user: {
    id: "u0",
    name: "Sarah Chen",
    email: "sarah@deeplink.ai",
    role: "attendee" as const,
    avatar: IMAGES.networkSarah,
    title: "Senior AI Researcher",
    company: "DeepLink",
    interests: ["#AI", "#GenModels", "#Research"],
  },
  reason:
    "Sarah is a Senior AI Researcher at DeepLink. Her expertise in generative models matches your profile interests.",
};

// ---- Help Desk ----
export const helpDesks: HelpDesk[] = [
  {
    id: "h1",
    name: "North Lobby Desk",
    distance: "45m",
    walkTime: "2 min walk",
    imageUrl: IMAGES.helpDeskStaff,
  },
];

// ---- Announcements ----
export const announcements: Announcement[] = [
  {
    id: "a1",
    title: "New Event Available!",
    message:
      "Early bird registration for 'Global AI Ethics 2025' is now open. Exclusive member discount applied.",
    cta: "Claim Discount",
    ctaLink: "/events/new",
    type: "promo",
    timestamp: "2024-10-20T10:00:00Z",
  },
];

// ---- Registered Events (Dashboard) ----
    location: "Jio World, Mumbai",
    imageUrl: IMAGES.eventFeatured,
    daysUntil: "In 2 Days",
  },
  {
    id: "re2",
    title: "Bharat Tech Expo",
    location: "Pragati Maidan, Delhi",
    imageUrl: IMAGES.eventTech,
    daysUntil: "May 1",
  },

// ---- Current User ----
export const currentUser: User = {
  id: "cu1",
  name: "Julian",
  email: "julian@example.com",
  role: "attendee",
  avatar: IMAGES.avatarMan1,
  title: "Software Engineer",
  company: "TechCorp India",
  interests: ["#AI", "#WebDev", "#Design"],
  points: 15,
  balance: 0,
};
