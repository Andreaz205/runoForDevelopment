
import { ChangeEvent, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { useQuery } from 'react-query'
import { VariantService } from '@/services/VariantService'

export const useSearch = (setVariants) => {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 500)

    const {isLoading, isSuccess, data} = useQuery(
        ['search variants list', debouncedSearch],
        () => VariantService.variantsBySearchTerm(debouncedSearch),
        {
            onSuccess: (response) => {
                setVariants(response?.data || [])
            },
            onError: (error) => {

            },
            enabled: !!debouncedSearch
        }
    )

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }


    return { isSuccess, handleSearch, data, searchTerm, isLoading}
}