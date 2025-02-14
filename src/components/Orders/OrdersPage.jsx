import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "../../styles/Orders.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { 
  selectOrderItems,
  fetchOrdersItemByUser,
  fetchOrderDatasByOrder
} from "../../features/orders/orderSlice";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const orderItems = useSelector(selectOrderItems); 
  const [activeOrderId, setActiveOrderId] = useState(null); // Храним id активного заказа
  const orderDatas = useSelector((state) => state.order.orderItems.find(order => order.id === activeOrderId)?.data || []); // Получаем данные для конкретного заказа

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchOrdersItemByUser(currentUser.id));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    // Если у нас есть заказы и еще не выбран активный заказ, выбираем первый заказ по умолчанию
    if (orderItems.length && !activeOrderId) {
      const firstOrderId = orderItems[0].id;
      setActiveOrderId(firstOrderId);
      dispatch(fetchOrderDatasByOrder(firstOrderId)); // Загружаем данные для первого заказа
    }
  }, [dispatch, orderItems, activeOrderId]);

  useEffect(() => {
    if (activeOrderId) {
      dispatch(fetchOrderDatasByOrder(activeOrderId)); // Загружаем данные для выбранного заказа
    }
  }, [dispatch, activeOrderId]);

  // Обработчик клика на строку таблицы
  const handleRowClick = (orderId) => {
    setActiveOrderId(orderId); // Устанавливаем активный id заказа
  };

  if (!currentUser) {
    return <div>Вы не авторизованы. Пожалуйста, войдите в систему.</div>;
  }

  return (
    <section className={styles.order}>
      <div>
        {/* Полоса заголовка с крестиком */}
        <div className={styles.titleBar}>    
          <div className={styles.closeBtn}>
            <Link to={ROUTES.HOME}>
              &times;
            </Link>
          </div>
        </div>

        <h2 className={styles.title}> O r d e r s </h2>
        {orderItems.length ? (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th1}>Data order</th>
                <th className={styles.th2}>Absender</th>
                <th className={styles.th2}>Post</th>
                <th className={styles.th2}>Bank</th>
                <th className={styles.th6}>Carte</th>
                <th className={styles.th3}>Sum order</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((order) => (
                <tr
                  key={order.id}
                  className={`${styles.row} ${activeOrderId === order.id ? styles.activeRow : ''}`}
                  onClick={() => handleRowClick(order.id)}
                >
                  <td className={styles.td1}>
                    {new Date(order.dateOrder).toLocaleString('ru-RU', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td>{order.absender}</td>
                  <td>{order.post}</td>
                  <td>{order.nameBank}</td>
                  <td>{order.carte}</td>
                  <td className={styles.td3}>{Number(order.sumOrder).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>У вас пока нет заказов.</p>
        )}
      </div>
      <div>
        <h2 className={styles.title}>Datas order</h2>
        {orderDatas.length ? (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th4}>Name</th>
                <th className={styles.th5}>Quantity</th>
                <th className={styles.th3}>Price</th>
                <th className={styles.th4}>Description</th>
              </tr>
            </thead>
            <tbody>
              {orderDatas.map((data, index) => (
                <tr key={index} className={styles.rowdata}>
                  <td>{data.title}</td>
                  <td className={styles.td3}>{data.quantity}</td>
                  <td className={styles.td3}>{Number(data.price).toFixed(2)}</td>
                  <td>{data.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Нет данных по заказу.</p>
        )}
      </div>
    </section>
  );
};

export default OrdersPage;