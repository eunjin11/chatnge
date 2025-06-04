const DiaryDate = ({ date }: { date: string }) => {
  return (
    <div className="text-center py-4 border-b border-gray-200">
      <p className="text-sm">{date}</p>
    </div>
  );
};

export default DiaryDate;
