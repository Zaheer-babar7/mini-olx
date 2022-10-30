import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const GetData = (setLoading) => {
  setLoading(true);
  return async (dispatch) => {
    const querySnapshot = await getDocs(
      query(collection(db, 'products'), where('isApproved', '==', true))
    );
    const dataArr = [];
    querySnapshot.forEach((doc) => {
      dataArr.push(doc.data());
    });
    setLoading(false);
    dispatch({ type: 'GET_DATA', payload: dataArr });
  };
};

export const GetDataForAdmin = (setLoading) => {
  setLoading(true);
  return async (dispatch) => {
    const querySnapshot = await getDocs(
      query(collection(db, 'products'), where('isApproved', '==', false))
    );
    const dataArr = [];
    querySnapshot.forEach((doc) => {
      dataArr.push({
        id: doc.id,
        value: doc.data(),
      });
    });
    setLoading(false);
    dispatch({ type: 'GET_DATA_FOR_ADMIN', payload: dataArr });
  };
};
