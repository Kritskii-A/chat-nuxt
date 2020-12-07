export default function({ store, redirect }) {
  // проверяем есть ли пользователь
  if (!Object.keys(store.state.user).length) {
    redirect("/?message=noUser");
  }
}
