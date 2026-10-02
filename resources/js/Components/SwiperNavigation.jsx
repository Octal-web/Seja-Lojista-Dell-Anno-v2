import {
    faCaretLeft,
    faCaretRight,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SwiperNavigation = ({
    current,
    total,
    onPrev,
    onNext,
    isBeginning,
    isEnd,
    className
}) => {
    return (
        <div role="group" aria-label="Controles do carrossel" className={`flex items-center gap-2 lg:gap-4 ${className ? className : 'text-primary/50'}`}>
            <button
                type="button"
                aria-label="Slide anterior"
                onClick={onPrev}
                disabled={isBeginning}
                className="transition hover:opacity-70 disabled:opacity-20"
            >
                <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
            </button>

            <span aria-live="polite" aria-atomic="true" className="text-xs xl:text-base tracking-[4.8px]">
                {String(current).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
            </span>

            <button
                type="button"
                aria-label="Próximo slide"
                onClick={onNext}
                disabled={isEnd}
                className="transition hover:opacity-70 disabled:opacity-40"
            >
                <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
            </button>
        </div>
    );
};
