export const idlFactory = ({ IDL }) => {
  const TaxPayer = IDL.Record({
    'tid' : IDL.Text,
    'address' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'addTaxPayer' : IDL.Func([TaxPayer], [Result], []),
    'deleteTaxPayer' : IDL.Func([IDL.Text], [Result], []),
    'getTaxPayerByTID' : IDL.Func([IDL.Text], [IDL.Opt(TaxPayer)], ['query']),
    'getTaxPayers' : IDL.Func([], [IDL.Vec(TaxPayer)], ['query']),
    'updateTaxPayer' : IDL.Func([TaxPayer], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
