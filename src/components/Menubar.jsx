import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react'
import moment from 'moment';

export default function Nav({username}) {
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink href='#'>{moment().format("YYYY-MM-D")}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href='#'>{username}</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}