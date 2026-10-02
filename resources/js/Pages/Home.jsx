import { BecomeShopkeeper } from "@/Components/Sections/BecomeShopkeeper";
import { BusinessInfo } from "@/Components/Sections/BusinessInfo";
import { BusinessModel } from "@/Components/Sections/BusinessModel";
import { BusinessMovement } from "@/Components/Sections/BusinessMovement";
import { FaqDoubts } from "@/Components/Sections/FaqDoubts";
import { HeroBanner } from "@/Components/Sections/HeroBanner";
import { StoreForm } from "@/Components/Sections/StoreForm";
import { Storefronts } from "@/Components/Sections/Storefronts";
import { SupportStructure } from "@/Components/Sections/SupportStructure";
import { Testimonials } from "@/Components/Sections/Testimonials";
import { VideoTestimonials } from "@/Components/Sections/VideoTestimonials";
import { Timeline } from "@/Components/Sections/Timeline";
import { UnicasaAbout } from "@/Components/Sections/UnicasaAbout";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useSectionTracking } from "@/Hooks/useSectionTracking";

const Page = () => {
    useSectionTracking();

    return (
        <DefaultLayout>
            <HeroBanner />
            <Timeline />
            <Testimonials />
            <VideoTestimonials />
            <SupportStructure />
            <UnicasaAbout />
            <StoreForm />
            <FaqDoubts />
        </DefaultLayout>
    );
};

export default Page;
