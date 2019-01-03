export class DeliverySheet {

  id?: number;
  batchNo?: string;
  deliveryman?: string;
  machineCapacity?: number;
  total?: number;
  machineLocation?: string;
  descriptions?: Array<{ goodsDesc: string, amount: number }>;
}
