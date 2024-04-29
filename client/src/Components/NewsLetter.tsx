import Button from './Button'

export default function NewsLetter() {
  return (
    <div className="bg-white">
        <div className=" py-12">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Subscribe to Our Newsletter
      </h2>
      <p className="mt-4 text-lg text-gray-600">
        Get job alerts, career advice, and industry insights delivered straight to your inbox.
      </p>
    </div>
    <div className="mt-8 flex flex-col gap-4 justify-center">
      <input
        className="w-full border border-gray-300 px-4 py-3 rounded-md shadow-sm focus:outline-none focus:border-blue-400 sm:max-w-xs"
        type="email"
        disabled
        placeholder="Enter your email"
        required
      />
      <Button
       title='Subscribe'
      />

    </div>
  </div>
</div>

    </div>
  )
}
