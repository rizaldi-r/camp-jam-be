import { SetMetadata } from '@nestjs/common';
import {
  IdSourceType,
  IdTypeType,
  ID_SOURCE_CONFIG_KEY,
  idSourceConfigItf,
} from 'src/_common/types/resource-owner.type';

/**
 * Decorator to specify where to get the resource ID from.
 * @param source Specifies where to get the resource ID from: 'param' (from URL params), 'user' (from authenticated user's ID), or 'query' (from a query parameter).
 * @param queryParamName Optional: The name of the query parameter to use if source is 'query'.
 */
export const OwnershipIdSource = (
  idSource: IdSourceType,
  idType: IdTypeType,
  queryParamName?: string,
) => {
  const metadata: idSourceConfigItf = {
    idSource,
    idType,
  };
  if (queryParamName) metadata.queryParamName = queryParamName;

  return SetMetadata(ID_SOURCE_CONFIG_KEY, metadata);
};
