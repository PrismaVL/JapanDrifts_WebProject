(function () {
    const overlay = document.querySelector(".brand-purchase-overlay");
    if (!overlay) return;

    const carInfo = {
        rx7: {
            title: "Mazda RX-7",
            era: "Fast & Furious · Tokyo Drift",
            summary: "The orange wide-body RX-7 shown here echoes Han's VeilSide Fortune car from The Fast and the Furious: Tokyo Drift.",
            history: "The third-generation RX-7 became one of Mazda's best-known sports cars, building on the model's long association with compact rotary-powered coupes. Its balanced chassis and distinctive design made it a favorite among enthusiasts.",
            use: "Designed as a two-seat sports coupe for enjoyable road driving, with track use as a natural extension. This example's film-inspired appearance is a tribute, not a factory trim.",
            facts: [
                "Han's movie car was a 1994 third-generation (FD) RX-7 fitted with the dramatic VeilSide Fortune body conversion.",
                "The orange paint, extended fenders, deep side skirts, and large rear wing made the build one of the film's standout silhouettes.",
                "This card is a livery-inspired illustration, not the actual movie car or a claim that its specifications match the film build."
            ]
        },
        rx3: {
            title: "Mazda RX-3",
            era: "Motorsport heritage · Savanna / RX-3",
            summary: "The yellow-and-green taxi-style treatment here is illustrative; the RX-3's real racing legacy is the remarkable part.",
            history: "Introduced as the Mazda Savanna in the early 1970s, the RX-3 became closely associated with Mazda's rotary-engine development and touring-car success. Its compact size and competition record helped establish it as a landmark early rotary model.",
            use: "Originally a practical compact coupe and sedan for everyday roads, it also proved adaptable to club and professional motorsport. Today, surviving examples are often enjoyed as classic road cars or restored competition cars.",
            facts: [
                "The Savanna/RX-3 debuted with a win at the Fuji 500 in 1971, then beat Nissan's Skyline GT-R in the touring-car category at the 1972 Japanese Grand Prix, ending its 50-race winning streak.",
                "Mazda's RX-3 program went on to score more than 100 victories by 1976.",
                "Rally legend Rod Millen won three consecutive New Zealand Rally Championship titles from 1975 to 1977 during the RX-3's competitive era."
            ]
        },
        s2000: {
            title: "Honda S2000",
            era: "Fast & Furious · 2 Fast 2 Furious",
            summary: "The hot-pink roadster shown here evokes Suki's unmistakable Honda S2000 from 2 Fast 2 Furious.",
            history: "Honda introduced the S2000 in 1999 to mark the company's 50th anniversary. The two-seat roadster carried forward Honda's tradition of precise, high-revving sports cars and became a modern classic after its production run ended in 2009.",
            use: "Built for open-air road driving, the S2000 suits weekend touring and spirited drives on suitable roads. Its film association comes from Suki's customized car in 2 Fast 2 Furious.",
            facts: [
                "The vivid pink finish and customized bodywork gave Suki's S2000 a look that stood out among the film's tuner cars.",
                "MotorTrend included an S2000 among the actual 2 Fast 2 Furious movie cars it tested, and noted that productions used multiple doubles with differing build details.",
                "This card is a screen-inspired tribute; its illustration is not presented as one of the film's original cars."
            ]
        },
        eclipse: {
            title: "Mitsubishi Eclipse",
            era: "Fast & Furious · the original film",
            summary: "The green, graphic-covered Eclipse pictured here recalls Brian O'Conner's modified Eclipse from The Fast and the Furious (2001).",
            history: "The Eclipse was developed for the North American market through a Mitsubishi-Chrysler collaboration and became a popular compact sport coupe across four generations. Its early models gained a lasting enthusiast following, later amplified by its appearance in the original Fast & Furious film.",
            use: "Made as a sporty coupe for everyday driving, with a range of trims aimed at different buyers. The green graphics evoke the movie car; they do not indicate that every Eclipse had the same equipment or performance.",
            facts: [
                "The film identifies Brian's car as a modified 1995 Mitsubishi Eclipse RS.",
                "The bright green paint and layered graphics made it one of the franchise's signature early tuner-car looks.",
                "The RS was distinct from the turbocharged Eclipse trims; the movie's modified screen car should not be confused with every factory Eclipse spec listed on this page."
            ]
        }
    };

    const vehicleContext = {
        "Toyota Supra MK4": {
            history: "The fourth-generation Supra arrived in the 1990s as the most focused version of Toyota's long-running grand-touring sports coupe. It later became a defining Japanese performance-car icon through motorsport, tuning culture, and film appearances.",
            use: "Conceived for fast, comfortable road trips as well as enthusiast driving. Today, owners commonly preserve it as a collectible or enjoy it as a carefully maintained sports coupe."
        },
        "Toyota 86": {
            history: "The Toyota 86 was developed with Subaru as an affordable, driver-focused coupe, drawing inspiration from lightweight, simple sports cars such as the AE86. It launched a new generation of accessible rear-drive Toyotas.",
            use: "A practical everyday coupe designed to make winding-road and track-day driving approachable, rather than relying on luxury or outright power."
        },
        "Toyota Celica": {
            history: "Introduced in 1970, the Celica brought sporty styling and accessible coupe performance to Toyota's lineup. Across seven generations it evolved from a light personal coupe into a successful rally and touring-car platform.",
            use: "Depending on generation, it served as a comfortable everyday coupe or liftback, with performance-oriented versions suited to club motorsport and enthusiastic road use."
        },
        "Toyota MR2": {
            history: "Toyota's MR2 made mid-engine sports-car packaging accessible across three generations. Its compact proportions and driver-focused layout gave it a distinctive place among Japanese sports cars.",
            use: "Designed as a two-seat road car for responsive, engaging drives. The different generations range from simple lightweight motoring to more refined sports-coupe comfort."
        },
        "Toyota Soarer": {
            history: "The Soarer was Toyota's premium grand-touring coupe, combining advanced technology and comfort across several generations. The later Z30 generation was sold in some markets as the Lexus SC.",
            use: "Built for relaxed long-distance journeys with a refined cabin, while sporty versions offered a more engaging character for everyday drives."
        },
        "Toyota Chaser": {
            history: "Part of Toyota's X-series family of upscale rear-drive sedans, the Chaser developed a following for combining everyday practicality with enthusiast-friendly engineering. Later performance versions became popular in Japanese touring-car and drift communities.",
            use: "A four-door sedan intended for daily transport and comfortable travel. Sportier trims are also valued for circuit use and organized motorsport."
        },
        "Mazda RX-7": { history: "The RX-7 line helped make Mazda's rotary-powered sports cars famous. Its final, third-generation form is especially admired for its flowing design and place in 1990s Japanese performance culture.", use: "A two-seat sports coupe for road enjoyment and occasional track use; its lightweight character also made it popular with motorsport enthusiasts." },
        "Mazda MX-5 Miata": {
            history: "Launched in 1989, the MX-5 revived the affordable, lightweight roadster and became one of the world's best-selling two-seat sports cars. Its successive generations have kept the original emphasis on simplicity and driver involvement.",
            use: "An approachable convertible for commuting, weekend touring, and driver-training or club track events. It is not a special-edition story here—just a roadster built to make ordinary drives enjoyable."
        },
        "Mazda RX-8": {
            history: "The RX-8 carried Mazda's rotary-engine tradition into the 2000s. Its distinctive four-door coupe body used rear-hinged rear access doors, allowing a sports-car shape with more passenger flexibility.",
            use: "Designed as a usable four-seat sports coupe for daily roads and spirited drives, with a cabin more accommodating than a conventional two-seater."
        },
        "Mazda Cosmo": {
            history: "Mazda's Cosmo began in the 1960s as the marque's first production rotary sports car and a showcase for the new engine technology. Later generations became increasingly refined grand-touring coupes.",
            use: "A personal coupe intended for comfortable road travel, with the later models emphasizing luxury and smooth long-distance cruising."
        },
        "Mazda Familia (Mazda 323)": {
            history: "The Familia, known internationally as the 323 in many markets, was one of Mazda's central compact-car lines. Its many generations ranged from economical family transport to rally-winning performance models.",
            use: "Primarily a practical compact for everyday commuting and family use; hatchback and performance variants also suited touring and motorsport."
        },
        "Mazda RX-3": { history: "Sold as the Savanna in Japan, the RX-3 helped establish Mazda's rotary engines in competition during the 1970s and became one of the era's most successful touring cars.", use: "Originally a compact everyday coupe or sedan, it is now commonly appreciated as a classic road car or restored motorsport machine." },
        "Honda NSX": {
            history: "The first-generation NSX launched in 1990 as a mid-engine sports car shaped by Honda's engineering expertise and extensive development with input from Formula One champion Ayrton Senna. It challenged established supercars with a focus on usability and quality.",
            use: "A supercar intended to be comfortable and dependable enough for regular road use, as well as rewarding on a circuit."
        },
        "Honda Civic Type R (EK9, FD2, FK8)": {
            history: "Civic Type R models brought Honda's Type R focus on lightness, chassis precision, and driver involvement to a compact hatchback and sedan. The EK9 was the first Civic Type R, followed by later generations including the FD2 and FK8.",
            use: "A practical compact for daily driving that can also serve as a capable track-day car. Body style and market availability vary by generation."
        },
        "Honda Integra Type R (DC2, DC5)": {
            history: "The Integra Type R became renowned for its careful chassis tuning and motorsport-influenced development. The DC2 in particular earned a reputation as one of the most focused front-wheel-drive cars of its era.",
            use: "A compact coupe or liftback usable for everyday trips, with precise handling that also suits autocross and circuit events."
        },
        "Honda S2000": { history: "Created for Honda's 50th anniversary, the S2000 continued the company's tradition of lightweight, high-revving sports cars and remained in production from 1999 to 2009.", use: "A two-seat convertible for everyday road use and open-top touring, equally at home at organized driver events." },
        "Honda Accord Euro R (CL1)": {
            history: "The CL1 Euro R was a Japan-market performance version of the sixth-generation Accord, reflecting Honda's approach of adding enthusiast-focused engineering to a useful family sedan.",
            use: "A four-door sedan for daily commuting and passenger duties, with a sharper driving character suited to longer journeys and spirited road use."
        },
        "Honda CR-X": {
            history: "The CR-X grew from Honda's Civic family into a light, compact two-seat or 2+2 sport compact. Its efficient packaging and low weight made it especially memorable among 1980s and 1990s enthusiasts.",
            use: "A small hatchback suited to economical everyday driving; performance versions also became popular for autocross and club racing."
        },
        "Mitsubishi Lancer Evolution (Evo IV, Evo V, Evo VI, Evo VII, Evo VIII, Evo IX, Evo X)": {
            history: "The Lancer Evolution began as a homologation-minded performance sedan and became closely tied to Mitsubishi's World Rally Championship program. Successive generations developed a loyal following among rally and road-car enthusiasts.",
            use: "A four-door road sedan with all-weather traction and everyday practicality, created with rally-inspired performance for road and sanctioned motorsport use."
        },
        "Mitsubishi 3000GT (GTO)": {
            history: "Known as the GTO in Japan, the 3000GT was Mitsubishi's technology-rich grand-touring flagship of the 1990s. Its advanced features and dramatic styling made it one of the era's most ambitious Japanese coupes.",
            use: "Designed for comfortable high-speed touring and daily road use, with the cabin and equipment expected of a grand tourer."
        },
        "Mitsubishi Eclipse": { history: "The Eclipse was a compact sport coupe developed for North America and sold across four generations. Its early turbo models became enthusiast favorites, and its film appearance helped cement its place in popular car culture.", use: "A sporty coupe for regular road driving, offered in varied trims and configurations over its lifespan." },
        "Mitsubishi Galant VR-4": {
            history: "The Galant VR-4 was Mitsubishi's turbocharged, all-wheel-drive performance sedan and an important predecessor to the Lancer Evolution. It also competed successfully in international rallying.",
            use: "A practical four-door sedan for daily driving and poor-weather conditions, with its rally-developed layout making it suitable for organized competition."
        },
        "Mitsubishi FTO": {
            history: "The FTO was a compact Japanese-market coupe introduced in the 1990s. Its distinctive styling and driver-focused character earned it a following beyond its original home market.",
            use: "A front-wheel-drive personal coupe intended for everyday use and enjoyable weekend drives, with a small rear seat for added flexibility."
        },
        "Mitsubishi Delica": {
            history: "The Delica has served as Mitsubishi's versatile van and people mover since the 1960s. Later four-wheel-drive versions became especially popular with campers and overland travelers.",
            use: "A spacious family or utility vehicle built to carry passengers and gear; four-wheel-drive versions are used for camping and access to rougher routes."
        },
        "Lexus IS F": {
            history: "Introduced in 2007, the IS F was Lexus's first production F performance model. It brought a more track-oriented character to the compact IS sedan while retaining the marque's emphasis on refinement.",
            use: "A four-door luxury sedan for daily travel and long-distance comfort, with added capability for occasional performance driving and track days."
        },
        "Lexus GS F": {
            history: "The GS F joined Lexus's F performance range as a high-performance version of the midsize GS sedan. It paired a driver-focused chassis with the quiet, carefully finished character expected of Lexus.",
            use: "A refined four-door sedan for everyday use and long trips, with a more engaging setup for drivers who want performance without giving up passenger comfort."
        },
        "Lexus SC": {
            history: "The Lexus SC was the brand's luxury grand-touring coupe. The first generation introduced Lexus coupe comfort, while the later SC 430 became a retractable-hardtop convertible.",
            use: "Made for comfortable road trips and relaxed everyday driving, prioritizing a quiet cabin and easy cruising."
        },
        "Lexus LS 400/430/460": {
            history: "The LS launched Lexus in 1989 with a focus on quietness, durability, and meticulous refinement. The LS 400, 430, and 460 represent successive generations of the flagship sedan.",
            use: "A full-size luxury sedan intended for comfortable daily transport and long-distance passenger travel."
        },
        "Lexus GX 470/460": {
            history: "The GX is a body-on-frame luxury SUV related to Toyota's Land Cruiser Prado. The 470 and 460 generations combined Lexus comfort with a durable platform designed for varied terrain.",
            use: "A family-oriented SUV for road travel, towing, and appropriate off-pavement routes, with a spacious cabin and four-wheel-drive capability."
        },
        "Lexus LFA": {
            history: "The LFA was a limited-production Lexus supercar developed over many years as a showcase of the company's engineering and craftsmanship. Its production run from 2010 to 2012 made it a rare modern collectible.",
            use: "A road-legal two-seat supercar intended for focused driving and occasional track use, rather than everyday errands or passenger capacity."
        },
        "Subaru Impreza WRX STI (GC8, GD, GR, VA)": {
            history: "The Impreza WRX STI grew from Subaru's rally program and became famous through World Rally Championship success in the 1990s and 2000s. The name covers several generations, from the original GC8 to the later VA.",
            use: "A practical compact sedan or hatchback for daily use in varied weather, with rally-derived engineering also suited to organized motorsport."
        },
        "Subaru Legacy GT/B Spec.B": {
            history: "The Legacy GT paired Subaru's all-weather engineering with a more performance-focused character. The Spec.B versions added a sharper chassis and became enthusiast-oriented alternatives to conventional family sedans.",
            use: "A comfortable four-door family car for commuting and longer trips, with all-wheel drive useful in changing weather."
        },
        "Subaru Forester STI": {
            history: "The Forester STI was a Japan-market performance take on Subaru's compact SUV, blending the Forester's useful shape with engineering from the brand's performance models.",
            use: "A versatile vehicle for family duties, cargo, and year-round travel, with extra performance for drivers who want a livelier SUV."
        },
        "Subaru BRZ (and Toyota 86)": {
            history: "The BRZ was co-developed with Toyota as a lightweight, rear-wheel-drive coupe focused on balance and driver involvement. Its shared platform with the Toyota 86 revived an accessible sports-car formula.",
            use: "A usable everyday coupe designed for enjoyable road driving, driver education, and accessible track days."
        },
        "Subaru Outback XT": {
            history: "The Outback evolved from Subaru's Legacy wagon into a higher-riding vehicle for active lifestyles. XT versions add turbocharged performance to the model's long-standing practicality.",
            use: "A spacious daily vehicle for families, luggage, and outdoor trips, designed for paved roads and suitable light off-pavement travel."
        },
        "Subaru SVX": {
            history: "The SVX was Subaru's distinctive grand-touring coupe of the 1990s, designed by Giorgetto Giugiaro. Its unusual window-in-window glass and smooth six-cylinder character set it apart from the brand's more utilitarian models.",
            use: "A comfortable two-door for relaxed long-distance road travel, with seating and refinement aimed at grand touring."
        },
        "Nissan Skyline GT-R (R32, R33, R34, R35)": {
            history: "The GT-R name spans a line of Nissan performance cars, from the Skyline-based R32, R33, and R34 to the R35, which became a standalone model. The R32's touring-car dominance helped revive the GT-R legend.",
            use: "A high-performance road car designed for everyday use as well as circuit driving. The exact body style and character differ substantially by generation."
        },
        "Nissan Silvia (S13, S14, S15)": {
            history: "The Silvia line became a defining Japanese rear-wheel-drive coupe, particularly in its S-chassis generations. Its balance and broad aftermarket support made it prominent in drifting and grassroots motorsport.",
            use: "A compact personal coupe for everyday road use; many are now maintained or modified for sanctioned drift and circuit events."
        },
        "Nissan Fairlady Z (300ZX, 350Z, 370Z)": {
            history: "Nissan's Z-car line began in 1969 and brought sports-car styling and performance to a wider audience. The 300ZX, 350Z, and 370Z each updated the formula for their respective eras.",
            use: "A two-seat or 2+2 sports car, depending on generation, intended for enjoyable road trips and everyday driving."
        },
        "Nissan 180SX/200SX/240SX": {
            history: "These market-specific names refer to closely related members of Nissan's S13 and S14 sports-coupe family. Their rear-drive layout and adaptable chassis made them staples of enthusiast and drift culture.",
            use: "A compact coupe or hatchback for daily road use, also widely prepared for sanctioned drifting and club motorsport."
        },
        "Nissan Pulsar GTI-R": {
            history: "The Pulsar GTI-R was Nissan's compact homologation special for Group A rallying in the early 1990s. Its rally program gave the small hatchback an outsized reputation among performance-car fans.",
            use: "A compact hatchback with everyday practicality, originally engineered to support rally competition and suitable for enthusiast road use."
        },
        "Nissan Laurel (C33, C34, C35)": {
            history: "The Laurel was Nissan's upscale midsize sedan, combining rear-wheel-drive proportions with a more restrained, comfortable character than the company's dedicated sports coupes. Later versions gained popularity among Japanese tuning enthusiasts.",
            use: "A four-door sedan for comfortable daily transport and longer trips; some enthusiasts also prepare examples for organized drifting."
        }
    };

    const specialModels = new Map([
        ["Mazda RX-7", "rx7"],
        ["Mazda RX-3", "rx3"],
        ["Honda S2000", "s2000"],
        ["Mitsubishi Eclipse", "eclipse"]
    ]);

    document.querySelectorAll(".vehicle-card").forEach((card) => {
        const title = card.querySelector("h2")?.textContent.trim();
        if (!title || card.querySelector(".vehicle-info-control")) return;

        const specialKey = specialModels.get(title);
        const control = document.createElement("div");
        control.className = "vehicle-info-control";

        if (specialKey) {
            const badge = document.createElement("span");
            badge.className = "vehicle-special-badge";
            badge.textContent = "Special";
            control.append(badge);
        }

        const button = document.createElement("button");
        button.className = "vehicle-info-button";
        button.type = "button";
        button.dataset.carInfo = specialKey || "standard";
        button.setAttribute("aria-label", `More about ${title}`);
        button.title = `More about ${title}`;
        button.textContent = "i";
        control.append(button);
        card.querySelector(".vehicle-card-art")?.append(control);
    });

    const infoDialog = document.createElement("dialog");
    infoDialog.className = "vehicle-info-dialog";
    infoDialog.setAttribute("aria-labelledby", "vehicle-info-title");
    infoDialog.innerHTML = `
        <div class="vehicle-info-dialog-header">
            <div>
                <p class="vehicle-info-dialog-kicker"></p>
                <h2 id="vehicle-info-title"></h2>
            </div>
            <button class="vehicle-info-dialog-close" type="button" aria-label="Close vehicle information">&times;</button>
        </div>
        <p class="vehicle-info-summary"></p>
        <section class="vehicle-info-story" hidden>
            <h3>Livery &amp; motorsport story</h3>
            <ul class="vehicle-info-facts"></ul>
        </section>
        <section class="vehicle-info-context">
            <h3>History</h3>
            <p class="vehicle-info-history"></p>
        </section>`;
    document.body.append(infoDialog);

    infoDialog.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            event.preventDefault();
            infoDialog.close();
        }
    });

    infoDialog.addEventListener("click", (event) => {
        if (event.target === infoDialog) {
            infoDialog.close();
        }
    });

    function openCarInfo(key, button) {
        const card = button?.closest(".vehicle-card");
        const title = card?.querySelector("h2")?.textContent.trim();
        if (!card || !title) return;

        const info = carInfo[key];
        const context = vehicleContext[title] || info;
        if (!context) {
            console.error(`Vehicle history and use information is missing for "${title}".`);
            return;
        }
        const special = Boolean(info);
        infoDialog.querySelector(".vehicle-info-dialog-kicker").textContent = special ? info.era : "Vehicle information";
        infoDialog.querySelector("#vehicle-info-title").textContent = title;
        const summary = infoDialog.querySelector(".vehicle-info-summary");
        summary.textContent = special ? info.summary : "";
        summary.hidden = !special;
        infoDialog.querySelector(".vehicle-info-history").textContent = context.history;

        const story = infoDialog.querySelector(".vehicle-info-story");
        story.hidden = !special;
        const storyFacts = story.querySelector(".vehicle-info-facts");
        storyFacts.replaceChildren(...(info?.facts || []).map((fact) => {
            const item = document.createElement("li");
            item.textContent = fact;
            return item;
        }));

        infoDialog.showModal();
        document.body.classList.add("brand-modal-open");
        infoDialog.querySelector(".vehicle-info-dialog-close").focus();
    }

    infoDialog.addEventListener("close", () => {
        document.body.classList.remove("brand-modal-open");
    });

    function closePurchaseDialog() {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("brand-modal-open");
    }

    document.addEventListener("click", (event) => {
        const infoButton = event.target.closest("[data-car-info]");
        if (infoButton) {
            event.preventDefault();
            event.stopPropagation();
            openCarInfo(infoButton.dataset.carInfo, infoButton);
        } else if (event.target.closest(".vehicle-info-dialog-close")) {
            infoDialog.close();
        } else if (event.target.closest("[data-buy-vehicle]")) {
            overlay.classList.add("is-open");
            document.body.classList.add("brand-modal-open");
            overlay.setAttribute("aria-hidden", "false");
            overlay.querySelector("[data-close-purchase]").focus();
        } else if (event.target.closest("[data-close-purchase]") || event.target === overlay) {
            closePurchaseDialog();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && overlay.classList.contains("is-open")) {
            closePurchaseDialog();
        }
    });
})();
