/**
 * CleanYourTV - Global IPTV Catalog & Service
 * Synchronized with https://github.com/iptv-org/iptv
 * Free public broadcast streams from all countries.
 */

const IPTV_COUNTRIES = [
    { code: "FAVORITES", name: "★ Favorites", flag: "⭐" },
    { code: "CUSTOM", name: "Custom M3U", flag: "📁" },
    { code: "ALL", name: "Global Highlights", flag: "🌍" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "IT", name: "Italy", flag: "🇮🇹" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" },
    { code: "MX", name: "Mexico", flag: "🇲🇽" },
    { code: "KR", name: "South Korea", flag: "🇰🇷" },
    { code: "CN", name: "China", flag: "🇨🇳" },
    { code: "NL", name: "Netherlands", flag: "🇳🇱" },
    { code: "SE", name: "Sweden", flag: "🇸🇪" },
    { code: "CH", name: "Switzerland", flag: "🇨🇭" },
    { code: "AR", name: "Argentina", flag: "🇦🇷" },
    { code: "TR", name: "Turkey", flag: "🇹🇷" },
    { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
    { code: "ZA", name: "South Africa", flag: "🇿🇦" },
    { code: "SG", name: "Singapore", flag: "🇸🇬" },
    { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
    { code: "ID", name: "Indonesia", flag: "🇮🇩" },
    { code: "PH", name: "Philippines", flag: "🇵🇭" }
];

const IPTV_CATEGORIES = [
    { id: "ALL", name: "All Genres", icon: "📺" },
    { id: "News", name: "News", icon: "📰" },
    { id: "Sports", name: "Sports", icon: "⚽" },
    { id: "Movies", name: "Movies", icon: "🎬" },
    { id: "Music", name: "Music", icon: "🎵" },
    { id: "Science", name: "Science & Nature", icon: "🔬" },
    { id: "Entertainment", name: "Entertainment", icon: "🍿" },
    { id: "Kids", name: "Kids & Animation", icon: "🧸" },
    { id: "Documentary", name: "Documentary", icon: "📚" }
];

const DEFAULT_IPTV_CHANNELS = [
    {
        "name": "Aaj Tak",
        "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_AAJ_TAK/images/LOGO_HD/image.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "http://103.213.31.109:90/AajtakHD/playlist.m3u8"
    },
    {
        "name": "Aaj Tak HD",
        "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_AAJ_TAK/images/LOGO_HD/image.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://feeds.intoday.in/aajtak/api/aajtakhd/master.m3u8"
    },
    {
        "name": "ABC News",
        "logo": "https://i.imgur.com/BrW7gk8.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://abc-news-dmd-streams-1.akamaized.net/out/v1/701126012d044971b3fa89406a440133/index.m3u8"
    },
    {
        "name": "ABC News Live 1",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://abcnews-streams.akamaized.net/hls/live/2023560/abcnewshudson1/master.m3u8"
    },
    {
        "name": "ABC News Live 2",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://abcnews-streams.akamaized.net/hls/live/2023561/abcnewshudson2/master.m3u8"
    },
    {
        "name": "ABC News Live 3",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://abcnews-streams.akamaized.net/hls/live/2023562/abcnewshudson3/master.m3u8"
    },
    {
        "name": "ABC News Live 4",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://abcnews-streams.akamaized.net/hls/live/2023563/abcnewshudson4/master.m3u8"
    },
    {
        "name": "ABC News Live 5",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://abcnews-streams.akamaized.net/hls/live/2023564/abcnewshudson5/master.m3u8"
    },
    {
        "name": "ABC News Live 6",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://abcnews-streams.akamaized.net/hls/live/2023565/abcnewshudson6/master.m3u8"
    },
    {
        "name": "ABC News Live 7",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://abcnews-streams.akamaized.net/hls/live/2023566/abcnewshudson7/master.m3u8"
    },
    {
        "name": "ABC News Live 8",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://abcnews-streams.akamaized.net/hls/live/2023567/abcnewshudson8/master.m3u8"
    },
    {
        "name": "ABC News Live 9",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://abcnews-streams.akamaized.net/hls/live/2023568/abcnewshudson9/master.m3u8"
    },
    {
        "name": "ABC News Live 10",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://abcnews-streams.akamaized.net/hls/live/2023569/abcnewshudson10/master.m3u8"
    },
    {
        "name": "ABC News Live",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6508be683a0d700008c534e4.m3u8"
    },
    {
        "name": "Al Jazeera 2",
        "logo": "https://i.imgur.com/miq8O1Q.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://live-hls-web-aja2-gcp.thehlive.com/AJA2/index.m3u8"
    },
    {
        "name": "Al Jazeera",
        "logo": "https://i.imgur.com/7bRVpnu.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://live-hls-apps-aja-fa.getaj.net/AJA/01.m3u8"
    },
    {
        "name": "Al Jazeera English",
        "logo": "https://i.imgur.com/7bRVpnu.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://live-hls-apps-aje-fa.getaj.net/AJE/index.m3u8"
    },
    {
        "name": "Al Jazeera English HD",
        "logo": "https://i.imgur.com/7bRVpnu.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "http://stream.mcquack.net/131/index.m3u8"
    },
    {
        "name": "Al Jazeera Mubasher 24",
        "logo": "https://i.imgur.com/LMCcIZ2.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://live-hls-apps-ajm24-fa.getaj.net/AJM24/index.m3u8"
    },
    {
        "name": "Al Jazeera Mubasher",
        "logo": "https://i.imgur.com/X80DQvF.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://live-hls-apps-ajm-fa.getaj.net/AJM/index.m3u8"
    },
    {
        "name": "Al Jazeera Mubasher Broadcast 2",
        "logo": "https://i.imgur.com/nJmi6G6.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://live-hls-apps-ajm2-fa.getaj.net/AJM2/index.m3u8"
    },
    {
        "name": "CBC News Network",
        "logo": "https://i.imgur.com/SjTdhvJ.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://d2ny9lo79ujali.cloudfront.net/CBC_News_International.m3u8"
    },
    {
        "name": "CBS News 24/7",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/CBS_News_247_logo.svg/960px-CBS_News_247_logo.svg.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6350fdd266e9ea0007bedec5.m3u8"
    },
    {
        "name": "CBS News Baltimore",
        "logo": "https://i.imgur.com/jy3UfCe.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://lineup.cbsivideo.com/playout/8877a7d5-b094-4ac8-bc72-75a5fed68e5b/index.m3u8"
    },
    {
        "name": "CBS News Bay Area",
        "logo": "https://static.wikia.nocookie.net/logopedia/images/1/1a/Logo-cbsn-bayarea-1920x1080.jpg/revision/latest/scale-to-width-down/512",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cbsn-sf.cbsnstream.cbsnews.com/out/v1/dac63c1abb3f4a2dac9f508f44bb072a/master.m3u8"
    },
    {
        "name": "CBS News Boston",
        "logo": "https://i.imgur.com/9un7R3N.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cbsn-bos.cbsnstream.cbsnews.com/out/v1/589d66ec6eb8434c96c28de0370d1326/master.m3u8"
    },
    {
        "name": "CBS News Chicago",
        "logo": "https://i.imgur.com/qGbVQir.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cbsn-chi.cbsnstream.cbsnews.com/out/v1/b2fc0d5715d54908adf07f97d2616646/master.m3u8"
    },
    {
        "name": "CBS News Colorado",
        "logo": "https://i.imgur.com/2oyYwBw.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cbsn-den.cbsnstream.cbsnews.com/out/v1/2e49baf2906244ecb01b07d9885fbe7a/master.m3u8"
    },
    {
        "name": "CBS News Detroit",
        "logo": "https://i.imgur.com/cMels2Y.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cbsn-det.cbsnstream.cbsnews.com/out/v1/169f5c001bc74fa7a179b19c20fea069/master.m3u8"
    },
    {
        "name": "CBS News Los Angeles",
        "logo": "https://i.imgur.com/klULxMV.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cbsn-la.cbsnstream.cbsnews.com/out/v1/57b6c4534a164accb6b1872b501e0028/master.m3u8"
    },
    {
        "name": "CBS News Miami",
        "logo": "https://i.imgur.com/DExbVa9.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cbsn-mia.cbsnstream.cbsnews.com/out/v1/ac174b7938264d24ae27e56f6584bca0/master.m3u8"
    },
    {
        "name": "CBS News Minnesota",
        "logo": "https://i.imgur.com/ubxwfMY.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cbsn-min.cbsnstream.cbsnews.com/out/v1/76518f06941246ba810c8d175600bf74/master.m3u8"
    },
    {
        "name": "CBS News New York",
        "logo": "https://i.imgur.com/bpc4v0u.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cbsn-ny.cbsnstream.cbsnews.com/out/v1/ec3897d58a9b45129a77d67aa247d136/master.m3u8"
    },
    {
        "name": "CBS News Philly",
        "logo": "https://i.imgur.com/FmtTbNY.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cbsn-phi.cbsnstream.cbsnews.com/out/v1/5c9ad3e215984b0e9ad845b335216b72/master.m3u8"
    },
    {
        "name": "CBS News Pittsburgh",
        "logo": "https://i.imgur.com/Un9IrUh.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cbsn-pit.cbsnstream.cbsnews.com/out/v1/6966dabf8150405ab26f854e3cd6a2b8/master.m3u8"
    },
    {
        "name": "CBS News Sacramento",
        "logo": "https://i.imgur.com/0e1kSGX.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://lineup.cbsivideo.com/playout/c1ed69db-6b71-4581-a937-a70ab4089f8a/index.m3u8"
    },
    {
        "name": "Cheddar News",
        "logo": "https://i.imgur.com/tuP9GW8.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://hls.livecdn.io/cheddar.com/cheddar/playlist.m3u8"
    },
    {
        "name": "DW Arabic",
        "logo": "https://i.imgur.com/8MRNFb9.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://dwamdstream103.akamaized.net/hls/live/2015526/dwstream103/master.m3u8"
    },
    {
        "name": "DW English",
        "logo": "https://i.imgur.com/8MRNFb9.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://amg01644-amg01644c1-amgplt0343.playout.now3.amagi.tv/ts-eu-w1-n2/playlist/amg01644-amg01644c1-amgplt0343/playlist.m3u8"
    },
    {
        "name": "DW Espanol",
        "logo": "https://i.imgur.com/8MRNFb9.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/master.m3u8"
    },
    {
        "name": "DW Russian",
        "logo": "https://i.imgur.com/8MRNFb9.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://dwamdstream110.akamaized.net/hls/live/2017971/dwstream110/master.m3u8"
    },
    {
        "name": "Euronews",
        "logo": "https://images-2.rakuten.tv/storage/global-live-channel/translation/artwork/bc84c3b7-6008-4ee3-8f6a-e4bb4365f082-width200-quality90.jpeg",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cdn-euronews.akamaized.net/live/eds/euronews-pl/26382/index.m3u8"
    },
    {
        "name": "Euronews Bulgaria",
        "logo": "https://i.imgur.com/RrQVoOg.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "http://213.91.179.28:8000/play/a05e"
    },
    {
        "name": "Euronews English",
        "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Euro_News.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61de96114757070008d33cae.m3u8"
    },
    {
        "name": "Euronews English HD",
        "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Euro_News.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://dash4.antik.sk/live/test_euronews/playlist.m3u8"
    },
    {
        "name": "Euronews French",
        "logo": "https://i.imgur.com/8t9mdg9.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://2f6c5bf4.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmxheHhUVi1ldV9FdXJvbmV3c0ZyYW5jYWlzX0hMUw/playlist.m3u8"
    },
    {
        "name": "Euronews Georgia",
        "logo": "https://i.imgur.com/VNJ4soR.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "http://nue01-edge01.itdc.ge/euronewsgeorgia/mpegts"
    },
    {
        "name": "Euronews German",
        "logo": "https://staticcyl.euronews.com/wp-content/uploads/2023/03/Logo_Euronews_white-on-neon_german_RGB.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6639d7d4b18d700008da5316.m3u8"
    },
    {
        "name": "Euronews Greek",
        "logo": "https://i.imgur.com/8t9mdg9.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cdn-euronews.akamaized.net/live/eds/euronews-el/25068/index.m3u8"
    },
    {
        "name": "Euronews Hungarian",
        "logo": "https://i.imgur.com/8t9mdg9.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cdn-euronews.akamaized.net/live/eds/euronews-hu/25075/index.m3u8"
    },
    {
        "name": "Euronews Italian",
        "logo": "https://i.imgur.com/8t9mdg9.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://acb6ca89.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmxheHhUVi1ldV9FdXJvbmV3c0l0YWxpYW5vX0hMUw/playlist.m3u8"
    },
    {
        "name": "Euronews Portuguese",
        "logo": "https://i.imgur.com/8t9mdg9.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-619e6614c9d9650007a2b171.m3u8"
    },
    {
        "name": "Euronews Romania",
        "logo": "https://i.imgur.com/jUOVUXt.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://hls02ns.antenaplay.ro/hls/euronews-ro-sd/index.m3u8"
    },
    {
        "name": "Euronews Russian",
        "logo": "https://i.imgur.com/8t9mdg9.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cdn-euronews.akamaized.net/live/eds/euronews-ru/25071/index.m3u8"
    },
    {
        "name": "Euronews Spanish",
        "logo": "https://i.imgur.com/8t9mdg9.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://iptv.bitred.cl/euronews/index.m3u8"
    },
    {
        "name": "France 24",
        "logo": "https://i.imgur.com/u8N6uoj.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://live.france24.com/hls/live/2037179-b/F24_FR_HI_HLS/master_5000.m3u8"
    },
    {
        "name": "France 24 Arabic",
        "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_FRANCE_24/images/LOGO_HD/image.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://live.france24.com/hls/live/2037222-b/F24_AR_HI_HLS/master_5000.m3u8"
    },
    {
        "name": "France 24 English",
        "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_FRANCE_24/images/LOGO_HD/image.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://live.france24.com/hls/live/2037218-b/F24_EN_HI_HLS/master_5000.m3u8"
    },
    {
        "name": "France 24 English HD",
        "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_FRANCE_24/images/LOGO_HD/image.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "http://nmk.ioapk.com:5050/4gtv-live146/index.m3u8"
    },
    {
        "name": "France 24 Spanish",
        "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_FRANCE_24/images/LOGO_HD/image.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://live.france24.com/hls/live/2037220-b/F24_ES_HI_HLS/master_5000.m3u8"
    },
    {
        "name": "India Today",
        "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_INDIA_TODAY/images/LOGO_HD/image.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://d1rc86nwwc9fag.cloudfront.net/vglive-sk-293160/master.m3u8"
    },
    {
        "name": "NBC News NOW",
        "logo": "https://i.imgur.com/JZt2qh5.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://d1si3n1st4nkgb.cloudfront.net/10502/88896001/hls/master.m3u8?ads.xumo_channelId=88896001"
    },
    {
        "name": "NDTV 24x7",
        "logo": "https://dtil.tmsimg.com/assets/s154895_ld_h15_aa.png?lock=720x540",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/YuppTV/NDTV24x7.m3u8"
    },
    {
        "name": "NDTV India",
        "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NDTV_INDIA/images/LOGO_HD/image.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/YuppTV/NDTVIndia.m3u8"
    },
    {
        "name": "NDTV Madhya Pradesh Chhattisgarh",
        "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NDTV_MPCG/images/LOGO_HD/image.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://ndtvregional.akamaized.net/hls/live/2102726-b/ndtvmpcg/master_1.m3u8"
    },
    {
        "name": "NDTV Marathi",
        "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NDTV_MARATHI/images/LOGO_HD/image.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://web-ndtv-marathi.akamaized.net/hls/live/2110470/ndtvmarathi/master_1.m3u8"
    },
    {
        "name": "NDTV Rajasthan",
        "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NDTV_RAJASTHAN/images/LOGO_HD/image.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://ndtvregional.akamaized.net/hls/live/2102726-b/ndtvraj/master_1.m3u8"
    },
    {
        "name": "NHK World-Japan",
        "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/NHK_World_Japan.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://masterpl.hls.nhkworld.jp/hls/w/live/smarttv.m3u8"
    },
    {
        "name": "NHK World-Japan HD",
        "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/NHK_World_Japan.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://freem3u.xyz/api/live/play.m3u8?vid=106"
    },
    {
        "name": "Pluto TV Record News",
        "logo": "https://images.pluto.tv/channels/6102e04e9ab1db0007a980a1/colorLogoPNG.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6102e04e9ab1db0007a980a1.m3u8"
    },
    {
        "name": "Rai News 24",
        "logo": "https://i.imgur.com/n2u57y3.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://rainews1-live.akamaized.net/hls/live/598326/rainews1/rainews1/playlist.m3u8"
    },
    {
        "name": "Rai News 24 HD",
        "logo": "https://i.imgur.com/n2u57y3.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://d3k8wzt41aflvx.cloudfront.net/RAINEWS24/Live.m3u8"
    },
    {
        "name": "Record News",
        "logo": "https://i.imgur.com/HZDRG0K.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "http://45.162.64.114/RECORD_NEWS/index.m3u8"
    },
    {
        "name": "Sky News Arabia",
        "logo": "https://i.imgur.com/SvjU4h6.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://live-stream.skynewsarabia.com/c-horizontal-channel/horizontal-stream/index.m3u8"
    },
    {
        "name": "Sky News Arabia SD",
        "logo": "https://i.imgur.com/SvjU4h6.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://stream.skynewsarabia.com/ott/ott.m3u8"
    },
    {
        "name": "Sky News Arabia Vertical",
        "logo": "https://i.imgur.com/FjtzQQs.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://live-stream.skynewsarabia.com/c-vertical-channel/vertical-stream/index.m3u8"
    },
    {
        "name": "Sky News Arabia Vertical SD",
        "logo": "https://i.imgur.com/FjtzQQs.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://stream.skynewsarabia.com/vertical/vertical.m3u8"
    },
    {
        "name": "Sky News Extra 1",
        "logo": "https://i.imgur.com/ZsPb8nL.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://skynewsau-live.akamaized.net/hls/live/2002689/skynewsau-extra1/master.m3u8"
    },
    {
        "name": "Sky News Extra 2",
        "logo": "https://i.imgur.com/ZsPb8nL.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://skynewsau-live.akamaized.net/hls/live/2002690/skynewsau-extra2/master.m3u8"
    },
    {
        "name": "Sky News Extra 3",
        "logo": "https://i.imgur.com/ZsPb8nL.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://skynewsau-live.akamaized.net/hls/live/2002691/skynewsau-extra3/master.m3u8"
    },
    {
        "name": "Sky News Urdu",
        "logo": "https://raw.githubusercontent.com/songwenhui239/Songwenhui239/refs/heads/main/sky-news-urdu-pk.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://lbgo.bozztv.com/ssh101/ssh101/skynews/playlist.m3u8"
    },
    {
        "name": "WELT",
        "logo": "https://i.imgur.com/s4TZoxx.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://dash4.antik.sk/live/test_welt_tizen/playlist.m3u8"
    },
    {
        "name": "WION",
        "logo": "https://i.imgur.com/Wc5Z3iS.png",
        "category": "News",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "http://vg-zeefta.akamaized.net/ptnr-yupptv/title-wion/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/20c3c0d9-0256-43fe-bca6-70fdd490b957/main.m3u8"
    },
    {
        "name": "DAZN Darts x Pluto TV",
        "logo": "https://images.pluto.tv/channels/64b67f0424ade50008a3be17/colorLogoPNG.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-64b67f0424ade50008a3be17.m3u8"
    },
    {
        "name": "DAZN Heldinnen x Pluto TV",
        "logo": "https://images.pluto.tv/channels/64afe50c5dc16600087f3227/colorLogoPNG.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-64afe50c5dc16600087f3227.m3u8"
    },
    {
        "name": "DD Sports",
        "logo": "https://dtil.tmsimg.com/assets/s158255_ld_h15_aa.png?lock=720x540",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/b17adfe543354fdd8d189b110617cddd/index.m3u8"
    },
    {
        "name": "DD Sports HD",
        "logo": "https://dtil.tmsimg.com/assets/s158255_ld_h15_aa.png?lock=720x540",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cdn.pishow.tv/ott/live/1161/master.m3u8"
    },
    {
        "name": "Pluto TV Competition",
        "logo": "https://images.pluto.tv/channels/603fde9026ecbf0007752c2c/colorLogoPNG.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-603fde9026ecbf0007752c2c.m3u8"
    },
    {
        "name": "Pluto TV Deportes",
        "logo": "https://images.pluto.tv/channels/5dcde07af1c85b0009b18651/colorLogoPNG_1766080575034.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5dcde07af1c85b0009b18651.m3u8"
    },
    {
        "name": "Pluto TV E-Sports",
        "logo": "https://images.pluto.tv/channels/5ff3934600d4c7000733ff49/colorLogoPNG.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5ff3934600d4c7000733ff49.m3u8"
    },
    {
        "name": "Pluto TV Esportes",
        "logo": "https://images.pluto.tv/channels/5f32d2db0af67400077f29c4/colorLogoSVG_1780355759776.svg",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f32d2db0af67400077f29c4.m3u8"
    },
    {
        "name": "Pluto TV Fishing",
        "logo": "https://images.pluto.tv/channels/619e1874e0d3a7000729a036/colorLogoPNG.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-619e1874e0d3a7000729a036.m3u8"
    },
    {
        "name": "Pluto TV Handbold Highlights",
        "logo": "https://images.pluto.tv/channels/68dfa431cc3c6cd904053100/colorLogoPNG_1761838112979.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68dfa431cc3c6cd904053100.m3u8"
    },
    {
        "name": "Pluto TV Handbold Live",
        "logo": "https://images.pluto.tv/channels/6618f54baec96800081525ec/colorLogoPNG_1762173655031.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6618f54baec96800081525ec.m3u8"
    },
    {
        "name": "Pluto TV Handboll Highlights",
        "logo": "https://images.pluto.tv/channels/68dfa3e2cc3c6cd904052c41/colorLogoPNG_1761838923264.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68dfa3e2cc3c6cd904052c41.m3u8"
    },
    {
        "name": "Pluto TV Handboll Live",
        "logo": "https://images.pluto.tv/channels/686faf533ffa5e0c912688e7/colorLogoPNG_1762169254016.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-686faf533ffa5e0c912688e7.m3u8"
    },
    {
        "name": "Pluto TV Snooker 900 (Sweden)",
        "logo": "https://images.pluto.tv/channels/68ac5543a1ac0c90f2c8943e/colorLogoPNG_1760517341343.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68ac56363efb41cd979a8005.m3u8"
    },
    {
        "name": "Pluto TV Snooker 900 (Sweden) DK",
        "logo": "https://images.pluto.tv/channels/68ac5543a1ac0c90f2c8943e/colorLogoPNG_1760517341343.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68ac55bb3efb41cd979a65ec.m3u8"
    },
    {
        "name": "Pluto TV Snooker 900 (Sweden) NO",
        "logo": "https://images.pluto.tv/channels/68ac5543a1ac0c90f2c8943e/colorLogoPNG_1760517341343.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68ac55fe3efb41cd979a6877.m3u8"
    },
    {
        "name": "Pluto TV Snooker 900 (United States)",
        "logo": "https://images.pluto.tv/channels/639b4f75d3d35c0007d37b30/colorLogoPNG_1759333260607.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-639b4f75d3d35c0007d37b30.m3u8"
    },
    {
        "name": "Pluto TV Sport (Germany)",
        "logo": "https://images.pluto.tv/channels/608030eff4b6f70007e1684c/colorLogoPNG_1746816937164.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-608030eff4b6f70007e1684c.m3u8"
    },
    {
        "name": "Pluto TV Sport (Sweden)",
        "logo": "https://images.pluto.tv/channels/6357f3de3643ba0007bc0b50/colorLogoPNG_1746816938506.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62cd74e38f6f0d000798cd93.m3u8"
    },
    {
        "name": "Pluto TV Sport (Sweden) DK",
        "logo": "https://images.pluto.tv/channels/6357f3de3643ba0007bc0b50/colorLogoPNG_1746816938506.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6357f3de3643ba0007bc0b50.m3u8"
    },
    {
        "name": "Pluto TV Sport (Sweden) NO",
        "logo": "https://images.pluto.tv/channels/6357f3de3643ba0007bc0b50/colorLogoPNG_1746816938506.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6357f33cb51d2d00077927c6.m3u8"
    },
    {
        "name": "Red Bull TV",
        "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://3ea22335.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlblRWLWdiX1JlZEJ1bGxUVl9ITFM/playlist.m3u8"
    },
    {
        "name": "Red Bull TV AU",
        "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://db34cc6127ac459db55cab5f97cd66b9.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-680-WORBAUENFAST-WHALETVPLUS/680/whaletvplus/hls/master/playlist.m3u8"
    },
    {
        "name": "Red Bull TV BR",
        "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://d03ae6b5c6724c24867e97a3dc04934a.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-1026-WORBBRPTFAST-WHALETVPLUS/1026/hls/master/playlist.m3u8"
    },
    {
        "name": "Red Bull TV DE",
        "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://46cfeb23c7f74853bba7a256655a3119.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-582-WORBDACHDEFAST-WHALETVPLUS/582/whaletvplus/hls/master/playlist.m3u8"
    },
    {
        "name": "Red Bull TV ES",
        "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://886bd3fbc782459f8de7555d32d7e9ce.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-957-WORBLATAMESFAST-WHALETVPLUS/957/whaletvplus/hls/master/playlist.m3u8"
    },
    {
        "name": "Red Bull TV SD",
        "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"
    },
    {
        "name": "Red Bull TV UK",
        "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://1a3566cb46914c5499fbc86fbc4ac87e.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-932-WORBUKENFAST-WHALETVPLUS/932/whaletvplus/hls/master/playlist.m3u8"
    },
    {
        "name": "Red Bull TV US",
        "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://0b73ace69ebb45eaa249bb87837cb958.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-644-WORBUSENFAST-LG_US/644/lgtv/hls/master/playlist.m3u8"
    },
    {
        "name": "World Poker Tour",
        "logo": "https://i.imgur.com/98kLMjj.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://d2e00kr7m9coe4.cloudfront.net/scheduler/scheduleMaster/406.m3u8"
    },
    {
        "name": "World Poker Tour Germany",
        "logo": "https://i.imgur.com/98kLMjj.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5ad9b7aae738977e2c312132.m3u8"
    },
    {
        "name": "World Poker Tour Poland",
        "logo": "https://i.imgur.com/98kLMjj.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/playlist.m3u8?ads.xumo_channelId=88883102"
    },
    {
        "name": "World Poker Tour UK",
        "logo": "https://i.imgur.com/98kLMjj.png",
        "category": "Sports",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://amg00477-samsungelectron-worldpokertour-samsunguk-81igb.amagi.tv/playlist/amg00477-samsungelectron-worldpokertour-samsunguk/playlist.m3u8"
    },
    {
        "name": "Cine 666 by Pluto TV",
        "logo": "https://images.pluto.tv/channels/6823648580b2665220d9e69a/colorLogoPNG-1757404141.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6823648580b2665220d9e69a.m3u8"
    },
    {
        "name": "Cine Action by Pluto TV",
        "logo": "https://images.pluto.tv/channels/5f8ed1ff5c39700007e2204a/colorLogoPNG_1752228138963.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f8ed1ff5c39700007e2204a.m3u8"
    },
    {
        "name": "Cine by Pluto TV",
        "logo": "https://images.pluto.tv/channels/5f8ed0f17564a300082b676a/colorLogoPNG_1775048900088.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f8ed0f17564a300082b676a.m3u8"
    },
    {
        "name": "Cine Catastrophe by Pluto TV",
        "logo": "https://images.pluto.tv/channels/65a69ef53af63d000825e0ee/colorLogoPNG_1751272916058.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-65a69ef53af63d000825e0ee.m3u8"
    },
    {
        "name": "Cine d'Asie by Pluto TV",
        "logo": "https://images.pluto.tv/channels/62f3e2d000418d00070f7dbc/colorLogoPNG_1751272759694.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62f3e2d000418d00070f7dbc.m3u8"
    },
    {
        "name": "Cine Horreur by Pluto TV",
        "logo": "https://images.pluto.tv/channels/66e1978babec540008ce41ac/colorLogoPNG_1751272165674.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-66e1978babec540008ce41ac.m3u8"
    },
    {
        "name": "Cine Retro by Pluto TV",
        "logo": "https://images.pluto.tv/channels/5f8ed168f72fcd0007e56269/colorLogoPNG_1751272859383.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f8ed168f72fcd0007e56269.m3u8"
    },
    {
        "name": "Cine Romance by Pluto TV",
        "logo": "https://images.pluto.tv/channels/60812fc8539963000707d1e1/colorLogoPNG_1775048649580.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-60812fc8539963000707d1e1.m3u8"
    },
    {
        "name": "Cine Sci-Fi by Pluto TV",
        "logo": "https://images.pluto.tv/channels/60c34592c911890007f29a73/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-60c34592c911890007f29a73.m3u8"
    },
    {
        "name": "Cine Thrillers by Pluto TV",
        "logo": "https://images.pluto.tv/channels/60c3472a51a2050008dad272/colorLogoPNG_1751272093012.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-60c3472a51a2050008dad272.m3u8"
    },
    {
        "name": "Cine Western by Pluto TV",
        "logo": "https://images.pluto.tv/channels/65cca3e2ec452d0008af3a65/colorLogoPNG_1751272826143.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-65cca3e2ec452d0008af3a65.m3u8"
    },
    {
        "name": "Pluto TV 90's Classics",
        "logo": "https://images.pluto.tv/channels/66b4990746762a00084c2f78/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-66b4990746762a00084c2f78.m3u8"
    },
    {
        "name": "Pluto TV A La Mexicana",
        "logo": "https://images.pluto.tv/channels/5dfcde52d28b09000a42d7a2/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5dfcde52d28b09000a42d7a2.m3u8"
    },
    {
        "name": "Pluto TV Action (Sweden)",
        "logo": "https://images.pluto.tv/channels/61c095861782bd000780e0ba/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61c0b0688a80a4000703fbcb.m3u8"
    },
    {
        "name": "Pluto TV Action (Sweden) DK",
        "logo": "https://images.pluto.tv/channels/61c095861782bd000780e0ba/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61c095861782bd000780e0ba.m3u8"
    },
    {
        "name": "Pluto TV Action (Sweden) NO",
        "logo": "https://images.pluto.tv/channels/61c095861782bd000780e0ba/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61c1e270489a9c000874d209.m3u8"
    },
    {
        "name": "Pluto TV Action (United States)",
        "logo": "https://i.imgur.com/tDapGal.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-561d7d484dc7c8770484914a.m3u8"
    },
    {
        "name": "Pluto TV Action Movies",
        "logo": "https://images.pluto.tv/channels/62ea3c2e4823db00072788ed/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62ea3c2e4823db00072788ed.m3u8"
    },
    {
        "name": "Pluto TV Alberto Sordi",
        "logo": "https://images.pluto.tv/channels/661f8f01801af800083d9d81/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-661f8f01801af800083d9d81.m3u8"
    },
    {
        "name": "Pluto TV Bang Bang",
        "logo": "https://images.pluto.tv/channels/663b9dc7cb3ea10008f1a0ce/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-663b9dc7cb3ea10008f1a0ce.m3u8"
    },
    {
        "name": "Pluto TV Bud & Terence (Germany)",
        "logo": "https://images.pluto.tv/channels/64be7398e4391c0008cdedfe/colorLogoPNG_1776936976930.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-64be7398e4391c0008cdedfe.m3u8"
    },
    {
        "name": "Pluto TV Bud & Terence (Sweden)",
        "logo": "https://images.pluto.tv/channels/64be7398e4391c0008cdedfe/colorLogoPNG_1776936976930.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-65b917720d9ab4000833f323.m3u8"
    },
    {
        "name": "Pluto TV Bud & Terence (Sweden) DK",
        "logo": "https://images.pluto.tv/channels/64be7398e4391c0008cdedfe/colorLogoPNG_1776936976930.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-65b915b1dc10a40008d53797.m3u8"
    },
    {
        "name": "Pluto TV Bud & Terence (Sweden) NO",
        "logo": "https://images.pluto.tv/channels/64be7398e4391c0008cdedfe/colorLogoPNG_1776936976930.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-65b916ec3af63d00084c5841.m3u8"
    },
    {
        "name": "Pluto TV Catastrofes",
        "logo": "https://images.pluto.tv/channels/645a309c5a0cd5000873f609/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-645a309c5a0cd5000873f609.m3u8"
    },
    {
        "name": "Pluto TV Christmas tutto l'anno",
        "logo": "https://images.pluto.tv/channels/612e05b885183d0007958101/colorLogoPNG_1770018716998.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-612e05b885183d0007958101.m3u8"
    },
    {
        "name": "Pluto TV Cine Accion",
        "logo": "https://images.pluto.tv/channels/5dcb62e63d4d8f0009f36881/colorLogoPNG_1760378798093.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5dcb62e63d4d8f0009f36881.m3u8"
    },
    {
        "name": "Pluto TV Cine Clasico",
        "logo": "https://images.pluto.tv/channels/609059dc63be6e0007b4eca6/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-609059dc63be6e0007b4eca6.m3u8"
    },
    {
        "name": "Pluto TV Cine Classicos",
        "logo": "https://images.pluto.tv/channels/5fa1612a669ba0000702017b/colorLogoPNG_1733440556804.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5fa1612a669ba0000702017b.m3u8"
    },
    {
        "name": "Pluto TV Cine Comedia (Germany)",
        "logo": "https://images.pluto.tv/channels/5f1ac8099c49f600076579b2/colorLogoPNG_1769092378955.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f1ac8099c49f600076579b2.m3u8"
    },
    {
        "name": "Pluto TV Cine Comedia (United States)",
        "logo": "https://images.pluto.tv/channels/5f12101f0b12f00007844c7c/colorLogoPNG_1732662798298.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f513564e4622a0007c578c0.m3u8"
    },
    {
        "name": "Pluto TV Cine Comedia (United States) BR",
        "logo": "https://images.pluto.tv/channels/5f12101f0b12f00007844c7c/colorLogoPNG_1732662798298.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f12101f0b12f00007844c7c.m3u8"
    },
    {
        "name": "Pluto TV Cine Comedia (United States) LatAm",
        "logo": "https://images.pluto.tv/channels/5f12101f0b12f00007844c7c/colorLogoPNG_1732662798298.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5dcdde78f080d900098550e4.m3u8"
    },
    {
        "name": "Pluto TV Cine Comedia Romantica",
        "logo": "https://images.pluto.tv/channels/62545ed3dab4380007582f7c/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62545ed3dab4380007582f7c.m3u8"
    },
    {
        "name": "Pluto TV Cine Crime",
        "logo": "https://images.pluto.tv/channels/6479ff764f5ba5000878dfe2/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6479ff764f5ba5000878dfe2.m3u8"
    },
    {
        "name": "Pluto TV Cine Crimen",
        "logo": "https://images.pluto.tv/channels/624af40c004f8000079b784d/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-624af40c004f8000079b784d.m3u8"
    },
    {
        "name": "Pluto TV Cine de autor",
        "logo": "https://images.pluto.tv/channels/60cc807324d60a0007708dc8/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-60cc807324d60a0007708dc8.m3u8"
    },
    {
        "name": "Pluto TV Cine Drama",
        "logo": "https://images.pluto.tv/channels/5f1210d14ae1f80007bafb1d/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f1210d14ae1f80007bafb1d.m3u8"
    },
    {
        "name": "Pluto TV Cine Drama LatAm",
        "logo": "https://images.pluto.tv/channels/5f1210d14ae1f80007bafb1d/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5dcddfcb229eff00091b6bdf.m3u8"
    },
    {
        "name": "Pluto TV Cine Estelar",
        "logo": "https://images.pluto.tv/channels/5dcde437229eff00091b6c30/colorLogoPNG_1769014514491.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5dcde437229eff00091b6c30.m3u8"
    },
    {
        "name": "Pluto TV Cine Familia",
        "logo": "https://images.pluto.tv/channels/5f171f032cd22e0007f17f3d/colorLogoPNG_1732045254120.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f171f032cd22e0007f17f3d.m3u8"
    },
    {
        "name": "Pluto TV Cine Familia LatAm",
        "logo": "https://images.pluto.tv/channels/5f171f032cd22e0007f17f3d/colorLogoPNG_1732045254120.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5dd6ddb30a1d8a000908ed4c.m3u8"
    },
    {
        "name": "Pluto TV Cine Inspiracao",
        "logo": "https://images.pluto.tv/channels/5fa991b1f09e020007e78626/colorLogoPNG_1748874366972.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5fa991b1f09e020007e78626.m3u8"
    },
    {
        "name": "Pluto TV Cine Inspirador",
        "logo": "https://images.pluto.tv/channels/6806d519fea7414f33f57016/colorLogoPNG_1746817663597.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6806d519fea7414f33f57016.m3u8"
    },
    {
        "name": "Pluto TV Cine Romance",
        "logo": "https://images.pluto.tv/channels/5f171f988ab9780007fa95ea/colorLogoPNG_1771344977802.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f171f988ab9780007fa95ea.m3u8"
    },
    {
        "name": "Pluto TV Cine Romance LatAm",
        "logo": "https://images.pluto.tv/channels/5f171f988ab9780007fa95ea/colorLogoPNG_1771344977802.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5dd7ea2aeab5230009986735.m3u8"
    },
    {
        "name": "Pluto TV Cine Romantico",
        "logo": "https://images.pluto.tv/channels/5f1ac9a2d3611d0007a844bb/colorLogoPNG_1747044085204.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f1ac9a2d3611d0007a844bb.m3u8"
    },
    {
        "name": "Pluto TV Cine Sucessos",
        "logo": "https://images.pluto.tv/channels/5f120e94a5714d00074576a1/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f120e94a5714d00074576a1.m3u8"
    },
    {
        "name": "Pluto TV Cine Suspenso",
        "logo": "https://images.pluto.tv/channels/5ddc4e8bcbb9010009b4e84f/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5ddc4e8bcbb9010009b4e84f.m3u8"
    },
    {
        "name": "Pluto TV Cinema Italiano",
        "logo": "https://images.pluto.tv/channels/608aa7d8359b270007861489/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-608aa7d8359b270007861489.m3u8"
    },
    {
        "name": "Pluto TV Cinema Orientale",
        "logo": "https://images.pluto.tv/channels/6786235bd648bf0008c2780a/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6786235bd648bf0008c2780a.m3u8"
    },
    {
        "name": "Pluto TV Comedias Romanticas",
        "logo": "https://images.pluto.tv/channels/655b5d865812e80008843bd1/colorLogoPNG_1747044085522.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-655b5d865812e80008843bd1.m3u8"
    },
    {
        "name": "Pluto TV Comedies Cultes",
        "logo": "https://images.pluto.tv/channels/67b4b2d976a934282e92d71c/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-67b4b2d976a934282e92d71c.m3u8"
    },
    {
        "name": "Pluto TV Comedy Movies",
        "logo": "https://images.pluto.tv/channels/62ea3d24b8e02600071fa296/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62ea3d24b8e02600071fa296.m3u8"
    },
    {
        "name": "Pluto TV Crime Drama",
        "logo": "https://images.pluto.tv/channels/62e92708a7ce600007b2676a/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f31fd1b4c510e00071c3103.m3u8"
    },
    {
        "name": "Pluto TV Crime Drama CA",
        "logo": "https://images.pluto.tv/channels/62e92708a7ce600007b2676a/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62e92708a7ce600007b2676a.m3u8"
    },
    {
        "name": "Pluto TV Crime Movies",
        "logo": "https://i.imgur.com/SJcqknt.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f4d8594eb979c0007706de7.m3u8"
    },
    {
        "name": "Pluto TV Cult Films (Germany)",
        "logo": "https://images.pluto.tv/channels/5c5c31f2f21b553c1f673fb0/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5c5c31f2f21b553c1f673fb0.m3u8"
    },
    {
        "name": "Pluto TV Cult Films (United States)",
        "logo": "https://i.imgur.com/xoaIAus.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5c665db3e6c01b72c4977bc2.m3u8"
    },
    {
        "name": "Pluto TV Danske klassikere",
        "logo": "https://images.pluto.tv/channels/67d2b814fe36d6e7b1d2318a/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-67d2b814fe36d6e7b1d2318a.m3u8"
    },
    {
        "name": "Pluto TV Drama",
        "logo": "https://i.imgur.com/PvhbHTZ.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5b4e92e4694c027be6ecece1.m3u8"
    },
    {
        "name": "Pluto TV Drama Movies",
        "logo": "https://images.pluto.tv/channels/62bdb0bcd707b9000739d2e5/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62bdb0bcd707b9000739d2e5.m3u8"
    },
    {
        "name": "Pluto TV Estrellas de Accion",
        "logo": "https://i.imgur.com/GVOYX4L.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5e972a21ad709d00074195ba.m3u8"
    },
    {
        "name": "Pluto TV Family Movie Club",
        "logo": "https://images.pluto.tv/channels/5dc3fc6b9133f500099c7d98/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5dc3fc6b9133f500099c7d98.m3u8"
    },
    {
        "name": "Pluto TV Fantasy & Horror",
        "logo": "https://images.pluto.tv/channels/685041d936c9361b1921c26c/colorLogoPNG_1753696741486.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-685041d936c9361b1921c26c.m3u8"
    },
    {
        "name": "Pluto TV Ferne Galaxien",
        "logo": "https://images.pluto.tv/channels/68ada46d5190a45dc9c45af1/colorLogoPNG_1773754781519.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68ada46d5190a45dc9c45af1.m3u8"
    },
    {
        "name": "Pluto TV Ficcao Cientifica",
        "logo": "https://images.pluto.tv/channels/5fa15ad6367e170007cdd098/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5fa15ad6367e170007cdd098.m3u8"
    },
    {
        "name": "Pluto TV Film (Germany)",
        "logo": "https://images.pluto.tv/channels/608aa17fb9f4490007e6419a/colorLogoPNG_1733013735186.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-608aa17fb9f4490007e6419a.m3u8"
    },
    {
        "name": "Pluto TV Film (Sweden)",
        "logo": "https://images.pluto.tv/channels/61c09515fbb4b50007d221f5/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61c0afa0a09bbe00078f8378.m3u8"
    },
    {
        "name": "Pluto TV Film (Sweden) DK",
        "logo": "https://images.pluto.tv/channels/61c09515fbb4b50007d221f5/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61c09515fbb4b50007d221f5.m3u8"
    },
    {
        "name": "Pluto TV Film (Sweden) NO",
        "logo": "https://images.pluto.tv/channels/61c09515fbb4b50007d221f5/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61c1e1e55deef000075aed0c.m3u8"
    },
    {
        "name": "Pluto TV Film Ancora Piu Romantici",
        "logo": "https://images.pluto.tv/channels/699d87093d5dba980705cca8/colorLogoPNG_1777274173528.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-699d87093d5dba980705cca8.m3u8"
    },
    {
        "name": "Pluto TV Film Azione",
        "logo": "https://images.pluto.tv/channels/608aa20a2e7f270007c4878d/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-608aa20a2e7f270007c4878d.m3u8"
    },
    {
        "name": "Pluto TV Film Commedia",
        "logo": "https://images.pluto.tv/channels/608aa512d67fd900072323db/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-608aa512d67fd900072323db.m3u8"
    },
    {
        "name": "Pluto TV Film Romantici",
        "logo": "https://images.pluto.tv/channels/608aa4a4cc92820007b663af/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-608aa4a4cc92820007b663af.m3u8"
    },
    {
        "name": "Pluto TV Film Storici",
        "logo": "https://images.pluto.tv/channels/68750875759366af05a151ce/colorLogoPNG_1756144116606.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68750875759366af05a151ce.m3u8"
    },
    {
        "name": "Pluto TV Film Thriller",
        "logo": "https://images.pluto.tv/channels/608aa5e995132a00075f7005/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-608aa5e995132a00075f7005.m3u8"
    },
    {
        "name": "Pluto TV Filmes Acao",
        "logo": "https://images.pluto.tv/channels/5f120f41b7d403000783a6d6/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f120f41b7d403000783a6d6.m3u8"
    },
    {
        "name": "Pluto TV Filmes Aventura",
        "logo": "https://images.pluto.tv/channels/66c79a4262e5510008ff68a5/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-66c79a4262e5510008ff68a5.m3u8"
    },
    {
        "name": "Pluto TV Filmes de Luta",
        "logo": "https://images.pluto.tv/channels/6806d62369aec5b19cd628c0/colorLogoPNG_1746817781806.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6806d62369aec5b19cd628c0.m3u8"
    },
    {
        "name": "Pluto TV Filmes Nacionais",
        "logo": "https://images.pluto.tv/channels/5f5a545d0dbf7f0007c09408/colorLogoPNG_1732044719987.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f5a545d0dbf7f0007c09408.m3u8"
    },
    {
        "name": "Pluto TV Franchise Favorites",
        "logo": "https://images.pluto.tv/channels/68fbf8101d26140175db8b58/colorLogoPNG_1762383685562.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68fbf8101d26140175db8b58.m3u8"
    },
    {
        "name": "Pluto TV Haialarm",
        "logo": "https://images.pluto.tv/channels/69b015c5d29cc97de7da4af8/colorLogoPNG_1779802132594.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-69b015c5d29cc97de7da4af8.m3u8"
    },
    {
        "name": "Pluto TV Harlequin",
        "logo": "https://images.pluto.tv/channels/68c01afa3efb41cd9759dafb/colorLogoPNG_1770018342774.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68c01bed508ba507f0d0dd60.m3u8"
    },
    {
        "name": "Pluto TV Harlequin DK",
        "logo": "https://images.pluto.tv/channels/68c01afa3efb41cd9759dafb/colorLogoPNG_1770018342774.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68c01afa3efb41cd9759dafb.m3u8"
    },
    {
        "name": "Pluto TV Harlequin NO",
        "logo": "https://images.pluto.tv/channels/68c01afa3efb41cd9759dafb/colorLogoPNG_1770018342774.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68c01b9a6bdcf3b9a64febcc.m3u8"
    },
    {
        "name": "Pluto TV Horror (Sweden)",
        "logo": "https://images.pluto.tv/channels/63a1c9790cc44a0007dc8857/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-63a19e1b9ab2df0007bef7a7.m3u8"
    },
    {
        "name": "Pluto TV Horror (Sweden) DK",
        "logo": "https://images.pluto.tv/channels/63a1c9790cc44a0007dc8857/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-63a1c9790cc44a0007dc8857.m3u8"
    },
    {
        "name": "Pluto TV Horror (Sweden) NO",
        "logo": "https://images.pluto.tv/channels/63a1c9790cc44a0007dc8857/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-63a19cb7847a090007f230d7.m3u8"
    },
    {
        "name": "Pluto TV Horror (United States)",
        "logo": "https://images.pluto.tv/channels/569546031a619b8f07ce6e25/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-569546031a619b8f07ce6e25.m3u8"
    },
    {
        "name": "Pluto TV Horror (United States) CA",
        "logo": "https://images.pluto.tv/channels/569546031a619b8f07ce6e25/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62ea3f8a38acc80007072d26.m3u8"
    },
    {
        "name": "Pluto TV Humor (Sweden)",
        "logo": "https://images.pluto.tv/channels/61c0974945b45d0007aaa5ac/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61c0974945b45d0007aaa5ac.m3u8"
    },
    {
        "name": "Pluto TV Icons",
        "logo": "https://images.pluto.tv/channels/64b585f84ea480000838e446/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-64b585f84ea480000838e446.m3u8"
    },
    {
        "name": "Pluto TV Invasion Alien",
        "logo": "https://images.pluto.tv/channels/654a35ce346f420008d5c36e/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-654a35ce346f420008d5c36e.m3u8"
    },
    {
        "name": "Pluto TV John Wayne",
        "logo": "https://images.pluto.tv/channels/655ca7aa635c3c000855d655/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-655caaaac0fc8800086f5d99.m3u8"
    },
    {
        "name": "Pluto TV John Wayne DK",
        "logo": "https://images.pluto.tv/channels/655ca7aa635c3c000855d655/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-655ca7aa635c3c000855d655.m3u8"
    },
    {
        "name": "Pluto TV John Wayne NO",
        "logo": "https://images.pluto.tv/channels/655ca7aa635c3c000855d655/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-655ca99dfbc15b00081f209c.m3u8"
    },
    {
        "name": "Pluto TV Komedi",
        "logo": "https://images.pluto.tv/channels/61c0b36d18447e000717d686/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61c0b36d18447e000717d686.m3u8"
    },
    {
        "name": "Pluto TV Komedie",
        "logo": "https://images.pluto.tv/channels/61c1e3a679a4390007c78136/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61c1e3a679a4390007c78136.m3u8"
    },
    {
        "name": "Pluto TV Kult Comedies",
        "logo": "https://images.pluto.tv/channels/66337de656fc840008ff7a65/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-66337de656fc840008ff7a65.m3u8"
    },
    {
        "name": "Pluto TV Kultfilm",
        "logo": "https://images.pluto.tv/channels/63dbe7ed51f5d000083e9499/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-63dbe7ed51f5d000083e9499.m3u8"
    },
    {
        "name": "Pluto TV Kultfilme",
        "logo": "https://images.pluto.tv/channels/5dde47b63585b500099f74ec/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5dde47b63585b500099f74ec.m3u8"
    },
    {
        "name": "Pluto TV Kultfilmer",
        "logo": "https://images.pluto.tv/channels/63dbe80f60bc8f0008aa7c78/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-63dbe8c8a9957100087798a3.m3u8"
    },
    {
        "name": "Pluto TV Kultfilmer NO",
        "logo": "https://images.pluto.tv/channels/63dbe80f60bc8f0008aa7c78/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-63dbe80f60bc8f0008aa7c78.m3u8"
    },
    {
        "name": "Pluto TV Legami Letali",
        "logo": "https://images.pluto.tv/channels/64808a8c536e0c0008a276d1/colorLogoPNG_1747395859514.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-64808a8c536e0c0008a276d1.m3u8"
    },
    {
        "name": "Pluto TV Movies",
        "logo": "https://images.pluto.tv/channels/5c5c3b948002db3c3e0b262e/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5c5c3b948002db3c3e0b262e.m3u8"
    },
    {
        "name": "Pluto TV Movies GB",
        "logo": "https://images.pluto.tv/channels/5c5c3b948002db3c3e0b262e/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5ad8d3a31b95267e225e4e09.m3u8"
    },
    {
        "name": "Pluto TV Netmovies",
        "logo": "https://images.pluto.tv/channels/663b9de4f999220008230fa8/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-663b9de4f999220008230fa8.m3u8"
    },
    {
        "name": "Pluto TV Notti di Passione",
        "logo": "https://images.pluto.tv/channels/6911c9704316999535eb21cf/colorLogoPNG_1766041294522.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6911c9704316999535eb21cf.m3u8"
    },
    {
        "name": "Pluto TV Notti di Sangue",
        "logo": "https://images.pluto.tv/channels/6911c92b4316999535eb1e08/colorLogoPNG_1766041125862.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6911c92b4316999535eb1e08.m3u8"
    },
    {
        "name": "Pluto TV Notti di Terrore",
        "logo": "https://images.pluto.tv/channels/6911c8dd8caba6f046c5c5d5/colorLogoPNG_1766041208757.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6911c8dd8caba6f046c5c5d5.m3u8"
    },
    {
        "name": "Pluto TV Nuestro Cine",
        "logo": "https://images.pluto.tv/channels/5defde6d6c07b50009cf0757/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5defde6d6c07b50009cf0757.m3u8"
    },
    {
        "name": "Pluto TV Paranormal (Sweden)",
        "logo": "https://images.pluto.tv/channels/62b30beb81f89900071fc7b9/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62b1e4189f5db20007ff03be.m3u8"
    },
    {
        "name": "Pluto TV Paranormal (Sweden) DK",
        "logo": "https://images.pluto.tv/channels/62b30beb81f89900071fc7b9/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62b30beb81f89900071fc7b9.m3u8"
    },
    {
        "name": "Pluto TV Psycho",
        "logo": "https://images.pluto.tv/channels/65ce480a78df2200131c597b/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-65ce480a78df2200131c597b.m3u8"
    },
    {
        "name": "Pluto TV Reaction",
        "logo": "https://i.imgur.com/H9k3OXN.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-617b37b361e0fd0008cfd8c5.m3u8"
    },
    {
        "name": "Pluto TV Retro Action Movies",
        "logo": "https://images.pluto.tv/channels/69a9ae4d3bd16a4ed04240d7/colorLogoPNG_1774879695281.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-69a9ae4d3bd16a4ed04240d7.m3u8"
    },
    {
        "name": "Pluto TV Romance",
        "logo": "https://i.imgur.com/GJBxfyf.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5a66795ef91fef2c7031c599.m3u8"
    },
    {
        "name": "Pluto TV Romantik",
        "logo": "https://images.pluto.tv/channels/63a1c954d3897300079fcb12/colorLogoPNG_1767773445743.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-63a19da6847a090007f230da.m3u8"
    },
    {
        "name": "Pluto TV Romantik DK",
        "logo": "https://images.pluto.tv/channels/63a1c954d3897300079fcb12/colorLogoPNG_1767773445743.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-63a1c954d3897300079fcb12.m3u8"
    },
    {
        "name": "Pluto TV Romantikk",
        "logo": "https://images.pluto.tv/channels/63a19bb5e6914b000721b5c0/colorLogoPNG_1767773376618.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-63a19bb5e6914b000721b5c0.m3u8"
    },
    {
        "name": "Pluto TV Sci-Fi (Sweden)",
        "logo": "https://images.pluto.tv/channels/60ed498c4248a400077c0b9d/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61f9597e78607000074f6c2a.m3u8"
    },
    {
        "name": "Pluto TV Sci-Fi (Sweden) DK",
        "logo": "https://images.pluto.tv/channels/60ed498c4248a400077c0b9d/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61f9598588f86000078ee7d6.m3u8"
    },
    {
        "name": "Pluto TV Sci-Fi (Sweden) NO",
        "logo": "https://images.pluto.tv/channels/60ed498c4248a400077c0b9d/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61f957e051cca800076f2358.m3u8"
    },
    {
        "name": "Pluto TV Sci-Fi (United States)",
        "logo": "https://images.pluto.tv/channels/66166cb1307fa30008f275e7/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5b4fc274694c027be6ed3eea.m3u8"
    },
    {
        "name": "Pluto TV Sci-Fi (United States) CA",
        "logo": "https://images.pluto.tv/channels/66166cb1307fa30008f275e7/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-66166cb1307fa30008f275e7.m3u8"
    },
    {
        "name": "Pluto TV Sci-Fi (United States) LatAm",
        "logo": "https://images.pluto.tv/channels/66166cb1307fa30008f275e7/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f2817d3d7573a00080f9175.m3u8"
    },
    {
        "name": "Pluto TV Serie Sci-Fi",
        "logo": "https://images.pluto.tv/channels/67ed14aaf7c5d70b9089c3bf/colorLogoPNG_1750259768860.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-67ed14aaf7c5d70b9089c3bf.m3u8"
    },
    {
        "name": "Pluto TV Spotlight",
        "logo": "https://i.imgur.com/UmuJkVB.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5ba3fb9c4b078e0f37ad34e8.m3u8"
    },
    {
        "name": "Pluto TV Staff Picks",
        "logo": "https://i.imgur.com/JzwO8IO.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f4d863b98b41000076cd061.m3u8"
    },
    {
        "name": "Pluto TV Star Trek (Germany)",
        "logo": "https://images.pluto.tv/channels/6152ee71bf99590007893a11/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6152ee71bf99590007893a11.m3u8"
    },
    {
        "name": "Pluto TV Star Trek (Sweden)",
        "logo": "https://images.pluto.tv/channels/61c1979dfa307000070bbe4d/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61c1979dfa307000070bbe4d.m3u8"
    },
    {
        "name": "Pluto TV Terror",
        "logo": "https://i.imgur.com/eWtoHDM.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5c6dc88fcd232425a6e0f06e.m3u8"
    },
    {
        "name": "Pluto TV Terror Trash",
        "logo": "https://images.pluto.tv/channels/66aa67493a4ad2000806d91b/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-66aa67493a4ad2000806d91b.m3u8"
    },
    {
        "name": "Pluto TV Thrillers",
        "logo": "https://i.imgur.com/ULKvDN7.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5b4e69e08291147bd04a9fd7.m3u8"
    },
    {
        "name": "Pluto TV Toto",
        "logo": "https://images.pluto.tv/channels/65253f9881f942000833ccd5/colorLogoPNG_1774617972809.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-65253f9881f942000833ccd5.m3u8"
    },
    {
        "name": "Pluto TV Trending Now",
        "logo": "https://images.pluto.tv/channels/673247127d5da5000817b4d6/colorLogoPNG_1732662634386.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-673247127d5da5000817b4d6.m3u8"
    },
    {
        "name": "Pluto TV Weihnachten im Sommer",
        "logo": "https://images.pluto.tv/channels/642ad072283aa4000806148c/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-642ad072283aa4000806148c.m3u8"
    },
    {
        "name": "Pluto TV Western",
        "logo": "https://images.pluto.tv/channels/630dd3b2605f140007e002f5/colorLogoPNG_1732030684562.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-630dd3b2605f140007e002f5.m3u8"
    },
    {
        "name": "Pluto TV Western ES",
        "logo": "https://images.pluto.tv/channels/630dd3b2605f140007e002f5/colorLogoPNG_1732030684562.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6385e82900ab2e000768a058.m3u8"
    },
    {
        "name": "Pluto TV Western IT",
        "logo": "https://images.pluto.tv/channels/630dd3b2605f140007e002f5/colorLogoPNG_1732030684562.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62e7fb67478a5b0007e6c50c.m3u8"
    },
    {
        "name": "Pluto TV Westerns (Germany)",
        "logo": "https://images.pluto.tv/channels/5d4bdb635ce813b38639e6a3/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5d4bdb635ce813b38639e6a3.m3u8"
    },
    {
        "name": "Pluto TV Westerns (United States)",
        "logo": "https://images.pluto.tv/channels/62bdacc96a3751000811842d/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5b4e94282d4ec87bdcbb87cd.m3u8"
    },
    {
        "name": "Pluto TV Westerns (United States) CA",
        "logo": "https://images.pluto.tv/channels/62bdacc96a3751000811842d/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62bdacc96a3751000811842d.m3u8"
    },
    {
        "name": "Pluto TV Wild West",
        "logo": "https://images.pluto.tv/channels/68c01732b3900870ec74766f/colorLogoPNG_1761917904777.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68c017bf337652ee75db201f.m3u8"
    },
    {
        "name": "Pluto TV Wild West DK",
        "logo": "https://images.pluto.tv/channels/68c01732b3900870ec74766f/colorLogoPNG_1761917904777.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68c01732b3900870ec74766f.m3u8"
    },
    {
        "name": "Pluto TV Wild West NO",
        "logo": "https://images.pluto.tv/channels/68c01732b3900870ec74766f/colorLogoPNG_1761917904777.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68c01785b3900870ec7480e4.m3u8"
    },
    {
        "name": "Pluto TV Zombies",
        "logo": "https://images.pluto.tv/channels/65786888b228b7000843ad9a/colorLogoPNG.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-65786888b228b7000843ad9a.m3u8"
    },
    {
        "name": "Rakuten TV Action Movies",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://a9c57ec7ec5e4b7daeacc6316a0bb404.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6069/master.m3u8"
    },
    {
        "name": "Rakuten TV Action Movies Austria",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://0f846627524f4dd2995e93581379db82.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung-at_RakutenActionMovies-1/playlist.m3u8"
    },
    {
        "name": "Rakuten TV Action Movies Finland",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://bca5a421a70c46ad911efd0a4767c4bf.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6075/master.m3u8"
    },
    {
        "name": "Rakuten TV Action Movies Germany",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://284824cf70404fdfb6ddf9349009c710.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6066/master.m3u8"
    },
    {
        "name": "Rakuten TV Action Movies Italy",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://87f2e2e5e7624e3bad85da1ca2ed31a7.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6067/master.m3u8"
    },
    {
        "name": "Rakuten TV Action Movies UK",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://54045f0c40fd442c8b06df076aaf1e85.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6065/master.m3u8"
    },
    {
        "name": "Rakuten TV Comedy Movies",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://71db867f03ce4d71a29e92155f07ab87.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6180/master.m3u8"
    },
    {
        "name": "Rakuten TV Comedy Movies Austria",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://7ed752b220a441b7b22bdf697c6c4df8.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung-at_RakutenComedyMovies-1/playlist.m3u8"
    },
    {
        "name": "Rakuten TV Comedy Movies Finland",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://a300af98e00746e2acf2346f43e47bd1.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6191/master.m3u8"
    },
    {
        "name": "Rakuten TV Comedy Movies Germany",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://ecac08c9e2214375b907d6825aaf9a01.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6182/master.m3u8"
    },
    {
        "name": "Rakuten TV Comedy Movies Italy",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://b8bc6c4b9be64bd6aeb3b92aa8521ed4.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6184/master.m3u8"
    },
    {
        "name": "Rakuten TV Comedy Movies UK",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://9be783d652cd4b099cf63e1dc134c4a3.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6181/master.m3u8"
    },
    {
        "name": "Rakuten TV Drama Movies",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://a7089c89d85f453d850c4a1518b43076.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6092/master.m3u8"
    },
    {
        "name": "Rakuten TV Drama Movies Austria",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://df1aa472ff5b4780a8d91fe319778b4d.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung-at_RakutenTVShows-1/playlist.m3u8"
    },
    {
        "name": "Rakuten TV Drama Movies Finland",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://d7e8ee3c924d4305a0c1840fe94c5d36.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6102/master.m3u8"
    },
    {
        "name": "Rakuten TV Drama Movies Germany",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://968754c2483045c1a9a7f677caec35b6.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6096/master.m3u8"
    },
    {
        "name": "Rakuten TV Drama Movies Italy",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://f84e0b1628464fab846160df957f269e.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6094/master.m3u8"
    },
    {
        "name": "Rakuten TV Drama Movies UK",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://fee09fd665814f51b939b6d106cf5f66.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6093/master.m3u8"
    },
    {
        "name": "Rakuten TV Family Movies",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://b0d59c8c98974e708e5ccb9a27cdfdfc.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6205/master.m3u8"
    },
    {
        "name": "Rakuten TV Family Movies Austria",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://9fa8baba055e4a52b0a8d1ae7d78bed8.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung-at_RakutenFamily-1/playlist.m3u8"
    },
    {
        "name": "Rakuten TV Family Movies Finland",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://758ee983d61e400381dea6fa8154f4e0.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6227/master.m3u8"
    },
    {
        "name": "Rakuten TV Family Movies Germany",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://af230031eeac45f3b78d4f8a13265105.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6209/master.m3u8"
    },
    {
        "name": "Rakuten TV Family Movies Italy",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://3315fc3e7276420f895e19cf807dbee1.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6215/master.m3u8"
    },
    {
        "name": "Rakuten TV Family Movies Switzerland",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://a24daf1125344b9cab66eed2fcff8821.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung-ch_RakutenFamily-1/playlist.m3u8"
    },
    {
        "name": "Rakuten TV Family Movies UK",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://e3207568b726401995c25670faaf32e4.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6203/master.m3u8"
    },
    {
        "name": "Rakuten TV Nordic Films",
        "logo": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/ff79e878-3eea-45fc-b0cd-55d6acce9b18-width200-quality90.jpeg",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://4aa9ef08b70d4b0c8f3519c5950b1930.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6303/master.m3u8"
    },
    {
        "name": "Rakuten TV Top Movies",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://ff335120300e4742a2b135ee9a9e7df8.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-5983/master.m3u8"
    },
    {
        "name": "Rakuten TV Top Movies Finland",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://1d1b0d4cb6ae4c31985d13221795695b.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6057/master.m3u8"
    },
    {
        "name": "Rakuten TV Top Movies Germany",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://cbb622b29f5d43b598991f3fa19de291.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-5985/master.m3u8"
    },
    {
        "name": "Rakuten TV Top Movies Italy",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://d4a4999341764c67a67e9ec9eb3790ab.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-5984/master.m3u8"
    },
    {
        "name": "Rakuten TV Top Movies UK",
        "logo": "https://i.imgur.com/Meew6eX.png",
        "category": "Movies",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://0145451975a64b35866170fd2e8fa486.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-5987/master.m3u8"
    },
    {
        "name": "Bloomberg Originals",
        "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Bloomberg_Originals.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://bloomberg.com/media-manifest/streams/qt.m3u8"
    },
    {
        "name": "Bloomberg Originals SD",
        "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Bloomberg_Originals.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://86fdc85a.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctZ2JfQmxvb21iZXJnT3JpZ2luYWxzX0hMUw/playlist.m3u8"
    },
    {
        "name": "Pluto TV Alien Invasion (Germany)",
        "logo": "https://images.pluto.tv/channels/6462190b7cb4b1000862dd60/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6462190b7cb4b1000862dd60.m3u8"
    },
    {
        "name": "Pluto TV Alien Invasion (Sweden)",
        "logo": "https://images.pluto.tv/channels/650999b86a841400083bd1ab/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-650999b86a841400083bd1ab.m3u8"
    },
    {
        "name": "Pluto TV Aliens",
        "logo": "https://images.pluto.tv/channels/6806d65e84f24b70109485fa/colorLogoPNG_1746817107468.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6806d65e84f24b70109485fa.m3u8"
    },
    {
        "name": "Pluto TV American True Crime",
        "logo": "https://images.pluto.tv/channels/692ebafce72f03e07e7df985/colorLogoPNG_1768902223754.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-692ebafce72f03e07e7df985.m3u8"
    },
    {
        "name": "Pluto TV Animais",
        "logo": "https://images.pluto.tv/channels/6474aa984cfc2c0008883a92/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6474aa984cfc2c0008883a92.m3u8"
    },
    {
        "name": "Pluto TV Animales",
        "logo": "https://images.pluto.tv/channels/600ae6a78d801e0007117d21/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-600ae6a78d801e0007117d21.m3u8"
    },
    {
        "name": "Pluto TV Animals",
        "logo": "https://images.pluto.tv/channels/5d767ae7b456c8cf265ce922/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5d767ae7b456c8cf265ce922.m3u8"
    },
    {
        "name": "Pluto TV Animals GB",
        "logo": "https://images.pluto.tv/channels/5d767ae7b456c8cf265ce922/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5ddf8ea0d000120009bcad83.m3u8"
    },
    {
        "name": "Pluto TV Animaux",
        "logo": "https://images.pluto.tv/channels/60925a44f0350600075a1fdc/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-60925a44f0350600075a1fdc.m3u8"
    },
    {
        "name": "Pluto TV Aventure",
        "logo": "https://images.pluto.tv/channels/611e7811eb9daf000764cbfd/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-611e7811eb9daf000764cbfd.m3u8"
    },
    {
        "name": "Pluto TV Britain at War",
        "logo": "https://images.pluto.tv/channels/625e8cb585ef320007806caf/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-625e8cb585ef320007806caf.m3u8"
    },
    {
        "name": "Pluto TV Conspiracy",
        "logo": "https://images.pluto.tv/channels/5d4ae94ef1a1bbb350ca41bb/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5d4ae94ef1a1bbb350ca41bb.m3u8"
    },
    {
        "name": "Pluto TV Documentari",
        "logo": "https://images.pluto.tv/channels/608aa8a5709d6b0007b132fe/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-608aa8a5709d6b0007b132fe.m3u8"
    },
    {
        "name": "Pluto TV Dokumentar",
        "logo": "https://images.pluto.tv/channels/62b30b0060a9ca0007d628b4/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62b1e2498261390007f25c98.m3u8"
    },
    {
        "name": "Pluto TV Dokumentar DK",
        "logo": "https://images.pluto.tv/channels/62b30b0060a9ca0007d628b4/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62b30b0060a9ca0007d628b4.m3u8"
    },
    {
        "name": "Pluto TV Explore",
        "logo": "https://images.pluto.tv/channels/5ad9b8551b95267e225e59c1/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5ad9b8551b95267e225e59c1.m3u8"
    },
    {
        "name": "Pluto TV Food",
        "logo": "https://images.pluto.tv/channels/5dc280c9aa218c0009724b4b/colorLogoPNG_1769092247484.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5dc280c9aa218c0009724b4b.m3u8"
    },
    {
        "name": "Pluto TV Food GB",
        "logo": "https://images.pluto.tv/channels/5dc280c9aa218c0009724b4b/colorLogoPNG_1769092247484.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5ddf930548ff9b00090d5686.m3u8"
    },
    {
        "name": "Pluto TV Histoire",
        "logo": "https://images.pluto.tv/channels/611e771e2f5f180007002224/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-611e771e2f5f180007002224.m3u8"
    },
    {
        "name": "Pluto TV Historia (Germany)",
        "logo": "https://images.pluto.tv/channels/61cd7b49543066000713b620/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61cd7b49543066000713b620.m3u8"
    },
    {
        "name": "Pluto TV History",
        "logo": "https://i.imgur.com/XkQD5kM.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5a4d35dfa5c02e717a234f86.m3u8"
    },
    {
        "name": "Pluto TV Investigacao",
        "logo": "https://i.imgur.com/JlQq0YJ.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f32cf37c9ff2b00082adbc8.m3u8"
    },
    {
        "name": "Pluto TV Mi Obsesion Favorita",
        "logo": "https://images.pluto.tv/channels/6109ab25b84d6a0007504886/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6109ab25b84d6a0007504886.m3u8"
    },
    {
        "name": "Pluto TV Mystery",
        "logo": "https://images.pluto.tv/channels/617aad99b68ef100072608cd/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-617aad99b68ef100072608cd.m3u8"
    },
    {
        "name": "Pluto TV Natura",
        "logo": "https://images.pluto.tv/channels/60802b37709d6b0007b0c549/colorLogoPNG_1773147389391.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-60802b37709d6b0007b0c549.m3u8"
    },
    {
        "name": "Pluto TV Naturaleza",
        "logo": "https://images.pluto.tv/channels/5dd85eac039bba0009e86d1d/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5dd85eac039bba0009e86d1d.m3u8"
    },
    {
        "name": "Pluto TV Nature",
        "logo": "https://images.pluto.tv/channels/5be1c3f9851dd5632e2c91b2/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5be1c3f9851dd5632e2c91b2.m3u8"
    },
    {
        "name": "Pluto TV Negocio Fechado",
        "logo": "https://images.pluto.tv/channels/64ad7394798def00087b2bfe/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-64ad7394798def00087b2bfe.m3u8"
    },
    {
        "name": "Pluto TV Paranormal (United States)",
        "logo": "https://images.pluto.tv/channels/62e92a58f3e4290007290c96/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5adf96e3e738977e2c31cb04.m3u8"
    },
    {
        "name": "Pluto TV Paranormal (United States) CA",
        "logo": "https://images.pluto.tv/channels/62e92a58f3e4290007290c96/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62e92a58f3e4290007290c96.m3u8"
    },
    {
        "name": "Pluto TV PetrolHeads",
        "logo": "https://images.pluto.tv/channels/65a7b0814a10d800085ff2df/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-65a7b0814a10d800085ff2df.m3u8"
    },
    {
        "name": "Pluto TV Policial",
        "logo": "https://images.pluto.tv/channels/678fdf9e3de7c8cf948e8824/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-678fdf9e3de7c8cf948e8824.m3u8"
    },
    {
        "name": "Pluto TV Reportagen",
        "logo": "https://images.pluto.tv/channels/68ada3edf84960586ad31c7d/colorLogoPNG_1760078189640.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-68ada3edf84960586ad31c7d.m3u8"
    },
    {
        "name": "Pluto TV Science",
        "logo": "https://i.imgur.com/uhunRoU.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-563a970aa1a1f7fe7c9daad7.m3u8"
    },
    {
        "name": "Pluto TV Space (Germany)",
        "logo": "https://images.pluto.tv/channels/61409f8d6feb30000766b675/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61409f8d6feb30000766b675.m3u8"
    },
    {
        "name": "Pluto TV Space (Germany) GB",
        "logo": "https://images.pluto.tv/channels/61409f8d6feb30000766b675/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5dbc2f98777f2e0009934ae7.m3u8"
    },
    {
        "name": "Pluto TV Space (Sweden)",
        "logo": "https://images.pluto.tv/channels/61b86c6ef30f5d0007e4c6d1/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61b86c6ef30f5d0007e4c6d1.m3u8"
    },
    {
        "name": "Pluto TV Storia",
        "logo": "https://images.pluto.tv/channels/65253fdf3fd33c00080214a3/colorLogoPNG_1773147329671.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-65253fdf3fd33c00080214a3.m3u8"
    },
    {
        "name": "Pluto TV Tough Jobs",
        "logo": "https://images.pluto.tv/channels/600acaff5f2d6e000745effb/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-600acaff5f2d6e000745effb.m3u8"
    },
    {
        "name": "Pluto TV True Crime (Sweden)",
        "logo": "https://images.pluto.tv/channels/615333098185f00008715a56/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61c0b438244e50000758083b.m3u8"
    },
    {
        "name": "Pluto TV True Crime (Sweden) DK",
        "logo": "https://images.pluto.tv/channels/615333098185f00008715a56/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61c097ec8bb1830008e3f962.m3u8"
    },
    {
        "name": "Pluto TV True Crime (Sweden) NO",
        "logo": "https://images.pluto.tv/channels/615333098185f00008715a56/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-61c1e51354d923000731bf78.m3u8"
    },
    {
        "name": "Pluto TV True Crime (United States)",
        "logo": "https://images.pluto.tv/channels/62e9289f8d467f0007fbc701/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5812be1c249444e05d09cc50.m3u8"
    },
    {
        "name": "Pluto TV True Crime (United States) CA",
        "logo": "https://images.pluto.tv/channels/62e9289f8d467f0007fbc701/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-62e9289f8d467f0007fbc701.m3u8"
    },
    {
        "name": "Pluto TV Turbo",
        "logo": "https://images.pluto.tv/channels/6014761dfb91870008ea6463/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6014761dfb91870008ea6463.m3u8"
    },
    {
        "name": "Pluto TV Varldskrigen",
        "logo": "https://images.pluto.tv/channels/677d3ad04bd63600082f7c54/colorLogoPNG_1759445391825.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-677d3ad04bd63600082f7c54.m3u8"
    },
    {
        "name": "Pluto TV Verdenskrigene",
        "logo": "https://images.pluto.tv/channels/677d397b60fbeb00084b0bff/colorLogoPNG_1759437735629.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-677d397b60fbeb00084b0bff.m3u8"
    },
    {
        "name": "Pluto TV Verdenskrigene NO",
        "logo": "https://images.pluto.tv/channels/677d397b60fbeb00084b0bff/colorLogoPNG_1759437735629.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-677d3a424bd63600082f7baf.m3u8"
    },
    {
        "name": "Smithsonian Channel Pluto TV",
        "logo": "https://images.pluto.tv/channels/6298bd10d88ef000073f16b7/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-6298bd10d88ef000073f16b7.m3u8"
    },
    {
        "name": "Smithsonian Channel Pluto TV LatAm",
        "logo": "https://images.pluto.tv/channels/6298bd10d88ef000073f16b7/colorLogoPNG.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-63a084934734f30007457b2c.m3u8"
    },
    {
        "name": "Spike Pluto TV",
        "logo": "https://i.imgur.com/woY8Ecb.png",
        "category": "Documentary",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5812bcc8237a6ff45d16c407.m3u8"
    },
    {
        "name": "Pluto TV Karaoke por Stingray",
        "logo": "https://images.pluto.tv/channels/5f85cf621d6d2200079f1de0/colorLogoPNG.png",
        "category": "Music",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-604b99d633a72b00078e05ad.m3u8"
    },
    {
        "name": "Pluto TV Karaoke por Stingray LatAm",
        "logo": "https://images.pluto.tv/channels/5f85cf621d6d2200079f1de0/colorLogoPNG.png",
        "category": "Music",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-5f85cf621d6d2200079f1de0.m3u8"
    },
    {
        "name": "Pluto TV Shows por Stingray",
        "logo": "https://images.pluto.tv/channels/604b91e0692f770007d9f33f/colorLogoPNG.png",
        "category": "Music",
        "country": "GLOBAL",
        "flag": "📺",
        "url": "https://jmp2.uk/plu-604b91e0692f770007d9f33f.m3u8"
    }
];

const IPTVService = {
    getCountries: function() {
        return IPTV_COUNTRIES;
    },

    getCategories: function() {
        return IPTV_CATEGORIES;
    },

    getDefaultChannels: function() {
        return DEFAULT_IPTV_CHANNELS;
    },

    parseM3U: function(content, defaultCountry = "Global") {
        const channels = [];
        const lines = content.split('\n');
        let current = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('#EXTINF:')) {
                current = {};
                const commaIdx = line.lastIndexOf(',');
                if (commaIdx !== -1) {
                    let rawName = line.substring(commaIdx + 1).trim();
                    rawName = rawName.replace(/\s*[\[\(][0-9]+p.*?[\)\]]/g, '').trim();
                    current.name = rawName;
                }

                if (line.indexOf('[Geo-blocked]') !== -1) {
                    current.geoBlocked = true;
                }

                const logoMatch = line.match(/tvg-logo="([^"]+)"/i);
                current.logo = logoMatch ? logoMatch[1] : '';

                const groupMatch = line.match(/group-title="([^"]+)"/i);
                current.category = groupMatch ? groupMatch[1].split(';')[0] : 'General';

                const countryMatch = line.match(/tvg-country="([^"]+)"/i);
                current.country = countryMatch ? countryMatch[1].toUpperCase() : defaultCountry;
                current.flag = "📺";

            } else if ((line.startsWith('http://') || line.startsWith('https://')) && current) {
                if (current.name && !current.geoBlocked) {
                    current.url = line;
                    channels.push(current);
                }
                current = null;
            }
        }
        return channels;
    },

    getFavorites: function() {
        try {
            const data = localStorage.getItem('cleanyourtv_iptv_favorites');
            return data ? JSON.parse(data) : [];
        } catch(e) {
            return [];
        }
    },

    isFavorite: function(url) {
        if (!url) return false;
        return this.getFavorites().some(c => c.url === url);
    },

    toggleFavorite: function(channel) {
        if (!channel || !channel.url) return false;
        let favs = this.getFavorites();
        const idx = favs.findIndex(c => c.url === channel.url);
        let isNowFav = false;
        if (idx >= 0) {
            favs.splice(idx, 1);
            isNowFav = false;
        } else {
            favs.unshift(channel);
            isNowFav = true;
        }
        try {
            localStorage.setItem('cleanyourtv_iptv_favorites', JSON.stringify(favs));
        } catch(e) {}
        return isNowFav;
    },

    getCustomPlaylists: function() {
        try {
            const data = localStorage.getItem('cleanyourtv_custom_playlists');
            return data ? JSON.parse(data) : [];
        } catch(e) {
            return [];
        }
    },

    addCustomPlaylist: function(name, url) {
        if (!url) return;
        const list = this.getCustomPlaylists();
        list.push({ name: name || 'Custom M3U', url: url, addedAt: new Date().toISOString() });
        try {
            localStorage.setItem('cleanyourtv_custom_playlists', JSON.stringify(list));
        } catch(e) {}
    },

    loadCountryChannels: function(countryCode, onSuccess, onError) {
        if (countryCode === "FAVORITES") {
            const favs = this.getFavorites();
            console.log(`[IPTV] Loaded ${favs.length} favorite channels`);
            onSuccess(favs.length > 0 ? favs : DEFAULT_IPTV_CHANNELS.slice(0, 10));
            return;
        }

        if (countryCode === "CUSTOM") {
            const customLists = this.getCustomPlaylists();
            if (customLists.length > 0) {
                const targetUrl = customLists[0].url;
                console.log(`[IPTV] Loading custom M3U: ${targetUrl}`);
                fetch(targetUrl)
                    .then(res => res.text())
                    .then(text => {
                        const parsed = this.parseM3U(text, "Custom");
                        onSuccess(parsed.length > 0 ? parsed : DEFAULT_IPTV_CHANNELS);
                    })
                    .catch(err => {
                        console.warn("[IPTV] Failed to fetch custom M3U:", err);
                        onSuccess(DEFAULT_IPTV_CHANNELS);
                    });
            } else {
                console.log("[IPTV] No custom M3U configured, using default channels");
                onSuccess(DEFAULT_IPTV_CHANNELS);
            }
            return;
        }

        if (countryCode === "ALL") {
            onSuccess(DEFAULT_IPTV_CHANNELS);
            return;
        }

        // Check local cache first
        const cacheKey = "iptv_cache_country_" + countryCode;
        try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed && parsed.length > 0) {
                    console.log(`[IPTV] Loaded ${parsed.length} cached channels for ${countryCode}`);
                    onSuccess(parsed);
                    return;
                }
            }
        } catch(e) {}

        const url = `https://iptv-org.github.io/iptv/countries/${countryCode.toLowerCase()}.m3u`;
        console.log(`[IPTV] Fetching live channels for ${countryCode} from ${url}`);

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Status: " + res.status);
                return res.text();
            })
            .then(text => {
                const list = this.parseM3U(text, countryCode);
                console.log(`[IPTV] Fetched ${list.length} channels for ${countryCode}`);
                if (list.length > 0) {
                    try { localStorage.setItem(cacheKey, JSON.stringify(list)); } catch(e) {}
                    onSuccess(list);
                } else {
                    onSuccess(DEFAULT_IPTV_CHANNELS.filter(c => c.country === countryCode));
                }
            })
            .catch(err => {
                console.warn(`[IPTV] Fallback for ${countryCode}:`, err);
                const filtered = DEFAULT_IPTV_CHANNELS.filter(c => c.country === countryCode);
                onSuccess(filtered.length > 0 ? filtered : DEFAULT_IPTV_CHANNELS);
            });
    },

    loadCategoryChannels: function(category, onSuccess, onError) {
        if (category === "ALL") {
            onSuccess(DEFAULT_IPTV_CHANNELS);
            return;
        }

        const url = `https://iptv-org.github.io/iptv/categories/${category.toLowerCase()}.m3u`;
        console.log(`[IPTV] Fetching live category '${category}' from ${url}`);

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Status: " + res.status);
                return res.text();
            })
            .then(text => {
                const list = this.parseM3U(text, "Global");
                console.log(`[IPTV] Fetched ${list.length} channels for ${category}`);
                onSuccess(list.length > 0 ? list : DEFAULT_IPTV_CHANNELS.filter(c => c.category.toLowerCase() === category.toLowerCase()));
            })
            .catch(err => {
                console.warn(`[IPTV] Fallback for category ${category}:`, err);
                onSuccess(DEFAULT_IPTV_CHANNELS.filter(c => c.category.toLowerCase() === category.toLowerCase()));
            });
    }
};

window.IPTVService = IPTVService;
window.IPTV_COUNTRIES = IPTV_COUNTRIES;
window.IPTV_CATEGORIES = IPTV_CATEGORIES;
window.DEFAULT_IPTV_CHANNELS = DEFAULT_IPTV_CHANNELS;
