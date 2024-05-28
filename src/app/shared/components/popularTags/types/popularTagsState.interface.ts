import {PopularTagType} from 'src/app/shared/types/popularTags.type'
 
export interface PopularTagsStateInterface {
  isLoading: boolean
  error: string | null
  data: PopularTagType[] | null
}