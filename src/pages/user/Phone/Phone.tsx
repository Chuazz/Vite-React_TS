// Framework
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Component
import { Banner } from '@components/Banner';
import { Dropdown } from '@components/Dropdown';
import { Pagnination } from '@components/Pagnination';
import ProductList from '@components/ProductList/ProductList';

// Style
import styles from './Phone.module.scss';

// Image
import { b1, b2 } from '@assets/image/Banner/Phone';

// Type
import { Option } from '@assets/types';
import Productdetail from '@models/ProductDetail';

// Config
import productAPI from '@config/productAPI';

const filters: Option[] = [
	{
		label: 'Giá thấp đến cao',
		value: 'asc',
	},
	{
		label: 'Giá cao đến thấp',
		value: 'desc',
	},
];

const categories: string[] = ['', 'iPhone 14', 'iPhone 13', 'iPhone 12', 'iPhone 11', 'iPhone SE'];

const Phone = () => {
	const [phones, setPhones] = useState<Productdetail[]>([]);
	const [currPage, setCurrPage] = useState(1);
	const [lastPage, setlastPage] = useState(1);
	const [currFilter, setCurrFilter] = useState({ name: '', sort: 'asc' });

	const onCategoryItemClick = (name: string) => {
		if (name === 'Tất cả') {
			name = '';
		}
		setCurrFilter({ ...currFilter, name });
	};

	const onSortItemClick = (option: Option) => {
		setCurrFilter({ ...currFilter, sort: option.value });
	};

	const onChangePage = (page: number) => {
		setCurrPage(page);
	};

	useEffect(() => {
		axios.get(productAPI.product_list({ ...currFilter, page: currPage })).then((res) => {
			setPhones(res.data.data);
			setlastPage(res.data.last_page);
		});
	}, [currPage, currFilter]);

	return (
		<div className={clsx(styles.container)}>
			<div className="wide grid">
				<p className={clsx(styles.label)}>iPhone</p>

				<Banner borderRadius="20px" banners={[b1, b2]} />

				<div className="row ali-center jus-between p-t-32 p-b-32">
					<div className={clsx(styles.categoryList, 'row ali-center gap-24')}>
						{categories.map((category, i) => (
							<p
								key={i}
								className={clsx({ [styles.active]: category === currFilter.name })}
								onClick={() => {
									onCategoryItemClick(category);
								}}
							>
								{category ? category : 'Tất cả'}
							</p>
						))}
					</div>

					<div className="row ali-center">
						<p className="t-white m-r-8">Xếp theo: </p>

						<Dropdown options={filters} onSelect={onSortItemClick} />
					</div>
				</div>

				<ProductList products={phones} />
				<Pagnination onChangePage={onChangePage} lastPage={lastPage} />
			</div>
		</div>
	);
};

export default Phone;
