// Framework
import { PropsWithChildren, forwardRef, memo, useState } from 'react';

type ImageProps = PropsWithChildren<{
	src: string;
	className: string;
	alt: string;
	onClick: Function;
}>;
export type Ref = HTMLImageElement;

const Image = forwardRef<Ref, ImageProps>(({ src, className, alt = 'error', onClick = () => {}, ...props }, ref) => {
	const [errSrc, setErrSrc] = useState('');

	return (
		<img
			className={className}
			src={errSrc || src}
			alt={alt}
			ref={ref}
			onError={() => setErrSrc('https://placehold.co/400')}
			onClick={(e) => onClick(e)}
			{...props}
		/>
	);
});

export default memo(Image);
