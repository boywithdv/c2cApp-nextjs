import { ComponentMeta } from '@storybook/react'
import Breadcrumb from './index'
import BreadcrumbItem from '../../Atoms/BreadcrumbItem'
import Link from 'next/link';

export default { title: 'Molecules/Breadcrumb' } as ComponentMeta<
  typeof Breadcrumb
>

export const Standard = () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <Link href="#">Top</Link>
      {/*<a></a>*/}
    </BreadcrumbItem>
    <BreadcrumbItem>
      <Link href="#">Clothes</Link>
    </BreadcrumbItem>
    <BreadcrumbItem>Item</BreadcrumbItem>
  </Breadcrumb>
);
